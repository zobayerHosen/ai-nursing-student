/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useRef, useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios.public";
import { GetVoiceSessionService } from "@/services/interactive-tool";

// ─── Voice Session Hook ───────────────────────────────────────────

/**
 * Hook to obtain an ephemeral OpenAI Realtime API session token
 * for initiating WebRTC voice calls.
 */
export const useGetVoiceSession = () => {
  const axiosInstance = axiosPublic();

  const {
    mutateAsync: getVoiceSession,
    isPending,
    data,
    error,
  } = useMutation({
    mutationFn: () => GetVoiceSessionService(axiosInstance),
  });

  /**
   * Extract the ephemeral key from the backend response.
   * Handles multiple possible response shapes.
   */
  const extractEphemeralKey = (responseData) => {
    if (!responseData) return null;

    if (responseData?.data?.value) {
      return responseData.data.value;
    }
    if (responseData?.client_secret?.value) {
      return responseData.client_secret.value;
    }
    if (responseData?.value) {
      return responseData.value;
    }

    return responseData?.ephemeral_key || null;
  };

  return {
    getVoiceSession,
    isPending,
    sessionData: data,
    ephemeralKey: data ? extractEphemeralKey(data) : null,
    error,
  };
};

// ─── Chat WebSocket Hook ───────────────────────────────────────────

const getChatWebSocketUrl = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://stemrn.softvencealpha.com";
  const wsProtocol = baseURL.startsWith("https") ? "wss" : "ws";
  const host = baseURL.replace(/^https?:\/\//, "");
  return `${wsProtocol}://${host}/ws/tutor/chat/`;
};

/**
 * Hook to manage a WebSocket connection to the AI tutor chat.
 *
 * @param {Object} options
 * @param {Function} options.onMessage - Callback for each parsed message from the server
 * @param {Function} options.onChatComplete - Callback with the final accumulated text when chat_done fires
 * @param {boolean}  [options.autoConnect=true] - Whether to connect on mount
 *
 * Returns:
 * - connect / disconnect / sendMessage / sendFile
 * - connectionStatus: "disconnected" | "connecting" | "connected"
 * - streamingText / isStreaming / isTyping
 */
export const useTutorChat = ({
  onMessage,
  onChatComplete,
  autoConnect = true,
} = {}) => {
  const wsRef = useRef(null);
  const connectPromiseRef = useRef(null);
  const streamingRef = useRef("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return Promise.resolve(wsRef.current);
    }

    if (wsRef.current?.readyState === WebSocket.CONNECTING && connectPromiseRef.current) {
      return connectPromiseRef.current;
    }

    setConnectionStatus("connecting");
    const url = getChatWebSocketUrl();
    console.log("[useTutorChat] Connecting to WebSocket:", url);

    const ws = new WebSocket(url);
    wsRef.current = ws;

    connectPromiseRef.current = new Promise((resolve, reject) => {
      let opened = false;

      ws.onopen = () => {
        opened = true;
        console.log("[useTutorChat] WebSocket connected");
        setConnectionStatus("connected");
        connectPromiseRef.current = null;
        resolve(ws);
      };

      ws.onclose = (event) => {
        console.log(
          "[useTutorChat] WebSocket closed — code:",
          event.code,
          "reason:",
          event.reason
        );
        setConnectionStatus("disconnected");
        if (wsRef.current === ws) {
          wsRef.current = null;
        }

        if (!opened) {
          connectPromiseRef.current = null;
          reject(
            new Error(
              event.reason || "WebSocket closed before the connection was established"
            )
          );
        }
      };

      ws.onerror = (err) => {
        console.error("[useTutorChat] WebSocket error:", err);
        setConnectionStatus("disconnected");
        if (!opened) {
          connectPromiseRef.current = null;
          reject(new Error("WebSocket connection failed"));
        }
      };

      ws.onmessage = (event) => {
        try {
          console.log("[useTutorChat] Raw message received:", event.data);
          const payload = JSON.parse(event.data);

          switch (payload.type) {
            case "chat_start":
              console.log("[useTutorChat] >> chat_start — AI started replying");
              streamingRef.current = "";
              setIsStreaming(true);
              setStreamingText("");
              break;

            case "chat_chunk": {
              const chunk = payload.text || "";
              streamingRef.current += chunk;
              setStreamingText((prev) => prev + chunk);
              break;
            }

            case "chat_done": {
              const finalText = streamingRef.current;
              console.log(
                "[useTutorChat] >> chat_done — final text length:",
                finalText.length
              );
              setIsStreaming(false);
              streamingRef.current = "";
              if (onChatComplete) {
                onChatComplete(finalText);
              }
              break;
            }

            case "chat_error":
              console.error(
                "[useTutorChat] >> chat_error:",
                payload.error
              );
              setIsStreaming(false);
              streamingRef.current = "";
              setStreamingText("");
              break;

            default:
              console.log(
                "[useTutorChat] Unknown message type:",
                payload.type,
                payload
              );
              break;
          }

          if (onMessage) {
            onMessage(payload);
          }
        } catch (err) {
          // Maybe the server sent non-JSON (e.g. plain text or binary)
          console.warn(
            "[useTutorChat] Non-JSON message received:",
            event.data,
            err
          );
        }
      };
    });

    return connectPromiseRef.current;
  }, [onMessage, onChatComplete]);

  const disconnect = useCallback(() => {
    connectPromiseRef.current = null;
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnectionStatus("disconnected");
    setIsStreaming(false);
    streamingRef.current = "";
    setStreamingText("");
  }, []);

  /**
   * Send a text message to the AI tutor.
   * Optionally include a file attachment.
   */
  const sendMessage = useCallback(
    async ({ text, file } = {}) => {
      let ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        try {
          ws = await connect();
        } catch (err) {
          console.warn("[useTutorChat] Unable to establish WebSocket:", err);
          return false;
        }
      }

      if (!ws || ws.readyState !== WebSocket.OPEN) {
        return false;
      }

      const payload = { text: text || "" };
      if (file) {
        payload.file = file;
      }

      ws.send(JSON.stringify(payload));
      return true;
    },
    [connect]
  );

  /**
   * Send a file with an optional text message to the AI tutor.
   * Reads the file as a base64 data URL first.
   */
  const sendFile = useCallback(
    async ({ file, text = "" } = {}) => {
      if (!file) {
        throw new Error("No file provided");
      }

      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      const base64Data = dataUrl.split(",")[1];
      const sent = await sendMessage({
        text,
        file: {
          name: file.name,
          type: file.name.split(".").pop().toLowerCase(),
          data: base64Data,
        },
      });

      if (!sent) {
        throw new Error("WebSocket not connected");
      }
    },
    [sendMessage]
  );

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect().catch((err) => {
        console.warn("[useTutorChat] Auto-connect failed:", err);
      });
    }
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    connect,
    disconnect,
    sendMessage,
    sendFile,
    connectionStatus,
    isStreaming,
    streamingText,
    isTyping: isStreaming,
  };
};
