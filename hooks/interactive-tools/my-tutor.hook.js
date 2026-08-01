/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useRef, useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios.public";
import { GetVoiceSessionService } from "@/services/interactive-tool";
import { getClientToken } from "@/utils/getClientToken";

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

/**
 * Build the tutor chat WebSocket URL.
 *
 * The backend authenticates WebSocket connections with the same JWT
 * used by the REST API. Browsers cannot attach custom headers to a
 * WebSocket, so the token is passed as a `?token=` query parameter.
 */
const getChatWebSocketUrl = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://stemrn.softvencealpha.com";
  const wsProtocol = baseURL.startsWith("https") ? "wss" : "ws";
  const host = baseURL.replace(/^https?:\/\//, "");

  const url = `${wsProtocol}://${host}/ws/tutor/chat/`;

  const token = typeof window !== "undefined" ? getClientToken() : null;
  if (!token) return url;

  return `${url}?token=${encodeURIComponent(token)}`;
};

/**
 * Hook to manage a WebSocket connection to the AI tutor chat.
 *
 * @param {Object} options
 * @param {Function} options.onMessage - Callback for each parsed message from the server
 * @param {Function} options.onChatComplete - Callback with the final accumulated text when chat_done fires
 * @param {Function} options.onChatHistory - Callback with server history messages when chat_history fires
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
  onChatHistory,
  autoConnect = true,
} = {}) => {
  const wsRef = useRef(null);
  const connectPromiseRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const manualCloseRef = useRef(false);
  const connectRef = useRef(null);
  const scheduleReconnectRef = useRef(null);
  const streamingRef = useRef("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const clearReconnectTimer = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  // Schedule a reconnect with exponential backoff (1s, 2s, 4s … capped at 30s)
  const scheduleReconnect = useCallback(() => {
    if (manualCloseRef.current) return;

    clearReconnectTimer();
    const attempt = reconnectAttemptsRef.current;
    reconnectAttemptsRef.current = attempt + 1;
    const delay = Math.min(1000 * 2 ** attempt, 30000);

    console.warn(
      `[useTutorChat] WebSocket lost — reconnecting in ${delay}ms (attempt ${attempt + 1})`
    );

    reconnectTimerRef.current = setTimeout(() => {
      reconnectTimerRef.current = null;
      if (connectRef.current) {
        connectRef.current().catch((err) => {
          console.warn("[useTutorChat] Reconnect failed:", err);
        });
      }
    }, delay);
  }, [clearReconnectTimer]);

  // Keep the latest implementations in refs to break the circular
  // dependency between `connect` and `scheduleReconnect`. Assigned in an
  // effect (not during render) per the react-hooks/refs rule.
  useEffect(() => {
    scheduleReconnectRef.current = scheduleReconnect;
  }, [scheduleReconnect]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return Promise.resolve(wsRef.current);
    }

    if (
      wsRef.current?.readyState === WebSocket.CONNECTING &&
      connectPromiseRef.current
    ) {
      return connectPromiseRef.current;
    }

    manualCloseRef.current = false;
    setConnectionStatus("connecting");
    const url = getChatWebSocketUrl();
    console.log("[useTutorChat] Connecting to WebSocket:", url);

    const ws = new WebSocket(url);
    wsRef.current = ws;

    connectPromiseRef.current = new Promise((resolve, reject) => {
      let opened = false;
      let settled = false;

      const settle = (ok) => {
        if (settled) return;
        settled = true;
        connectPromiseRef.current = null;
        if (ok) resolve(ws);
        else reject(new Error("WebSocket connection failed"));
      };

      ws.onopen = () => {
        opened = true;
        console.log("[useTutorChat] WebSocket connected");
        reconnectAttemptsRef.current = 0;
        setConnectionStatus("connected");
        settle(true);
      };

      ws.onclose = (event) => {
        const wasOpen = opened;
        console.warn(
          "[useTutorChat] WebSocket closed — code:",
          event.code,
          "reason:",
          event.reason,
          event.wasClean ? "(clean)" : "(unclean)"
        );
        setConnectionStatus("disconnected");
        const isCurrent = wsRef.current === ws;
        if (isCurrent) {
          wsRef.current = null;
        }

        if (!wasOpen && !settled) {
          settle(false);
        }

        // Auto-reconnect only if this socket is still the active one and
        // the close was not a manual disconnect.
        if (
          isCurrent &&
          !manualCloseRef.current &&
          scheduleReconnectRef.current
        ) {
          scheduleReconnectRef.current();
        }
      };

      ws.onerror = (err) => {
        // The Event object carries no details — the close code/reason in
        // onclose is the reliable source of information.
        // console.error(
        //   "[useTutorChat] WebSocket error (see close code for reason):",
        //   err?.message || err || {}
        // );
        setConnectionStatus("disconnected");
        if (!opened && !settled) {
          settle(false);
        }
      };

      ws.onmessage = (event) => {
        try {
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

            case "chat_history": {
              const history = payload.messages || payload.history || [];
              console.log(
                "[useTutorChat] >> chat_history — messages:",
                history.length
              );
              if (onChatHistory) {
                onChatHistory(history);
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
  }, [onMessage, onChatComplete, onChatHistory]);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  const disconnect = useCallback(() => {
    manualCloseRef.current = true;
    clearReconnectTimer();
    reconnectAttemptsRef.current = 0;
    connectPromiseRef.current = null;
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnectionStatus("disconnected");
    setIsStreaming(false);
    streamingRef.current = "";
    setStreamingText("");
  }, [clearReconnectTimer]);

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
