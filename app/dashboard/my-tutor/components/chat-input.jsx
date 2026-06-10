import React, { useState, useRef } from 'react';
import { SendHorizontal, Paperclip, Mic, Keyboard } from 'lucide-react';

export default function ChatInput({ onSendMessage, activeMode, setActiveMode }) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeMode === 'voice' || !text.trim()) return;
    onSendMessage({ type: 'text', content: text });
    setText('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onSendMessage({
      type: 'file',
      name: file.name,
      size: file.size,
      file: file
    });

    e.target.value = '';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onSendMessage({
          type: 'audio',
          blob: audioBlob,
          url: URL.createObjectURL(audioBlob)
        });

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setActiveMode('voice');
    } catch (err) {
      console.error("Microphone access denied or unsupported:", err);
      setActiveMode('chat');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setActiveMode('chat');
  };

  const toggleVoiceRecording = () => {
    if (activeMode !== 'voice') {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300">
        
        <label className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <Paperclip className="w-4 h-4" />
          <input 
            type="file" 
            className="hidden" 
            accept=".pdf,.docx,.txt,image/*" 
            onChange={handleFileChange}
          />
        </label>

        {activeMode === 'chat' ? (
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message . . ." 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 focus:ring-0"
          />
        ) : (
          <div className="flex-1 flex items-center gap-3 px-2">
            <span className="text-xs text-primary font-semibold tracking-wide animate-pulse">
              {isRecording ? "Listening..." : "Processing audio..."}
            </span>
            <div className="flex items-center gap-1 h-4">
              <span className="w-0.5 h-3.5 bg-primary/70 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-0.5 h-5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-0.5 h-4 bg-primary/80 rounded-full animate-bounce [animation-delay:-0.45s]"></span>
              <span className="w-0.5 h-2.5 bg-primary/60 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 pl-1 border-l border-gray-200/60">
          <button 
            type="button"
            onClick={toggleVoiceRecording}
            className={`p-2 rounded-xl transition flex items-center justify-center ${
              activeMode === 'voice' 
                ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title={activeMode === 'voice' ? "Stop & Send Audio" : "Switch to Mic Layout"}
          >
            {activeMode === 'voice' ? <Keyboard className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {activeMode === 'chat' && (
            <button 
              type="submit" 
              className="p-2 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-sm transition disabled:opacity-40 flex items-center justify-center"
              disabled={!text.trim()}
            >
              <SendHorizontal className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </form>
  );
}