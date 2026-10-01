import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  Minus,
  Maximize2,
  Minimize2,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { sendChatMessage } from '../api/chat';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  model?: string;
}

interface CopilotChatbotProps {
  onInsertToAnalyzer?: (text: string) => void;
}

const QUICK_PROMPTS = [
  'Which standard applies to 90W LED street lights?',
  'Is IS 1944 still valid or withdrawn?',
  'What are mandatory QCOs for solar PV modules?',
  'What tests are required for surgical face masks?'
];

export const CopilotChatbot: React.FC<CopilotChatbotProps> = ({ onInsertToAnalyzer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Namaste! I am your **ISpectra AI Copilot**, specialized in Bureau of Indian Standards (BIS) specifications, public procurement tenders (GeM/CPPP), mandatory QCOs, and testing protocols.\n\nHow can I assist your tender or standards search today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'gemini-3.8-flash'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (messageToSend = inputMessage) => {
    const trimmed = messageToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(trimmed);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: response.model || 'gemini-3.8-flash'
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallbackMessage: Message = {
        id: `fallback-${Date.now()}`,
        sender: 'assistant',
        text: 'I was unable to retrieve a live response. Please check your query or try selecting one of the suggested prompts.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: 'Chat history cleared. What Indian Standard or procurement requirement would you like to explore?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'gemini-3.8-flash'
      }
    ]);
  };

  // Format bold text and lists cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Split on bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-[#171717]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={pIdx} className="italic text-[#444444]">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });

      return (
        <span key={i} className="block leading-relaxed min-h-[1.2em]">
          {formattedLine}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button (Visible when closed) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#7F171D] hover:bg-[#5E1116] text-[#FFFFFF] px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20"
            aria-label="Open ISpectra AI Copilot"
          >
            <div className="relative flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold uppercase tracking-wider">AI Copilot</span>
              <span className="text-[10px] text-white/80 font-mono -mt-0.5">Free BIS Assistant</span>
            </div>
          </button>
        </div>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-4 right-4 w-72 sm:w-80 h-14'
              : 'bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-[420px] h-[92vh] sm:h-[620px] max-h-screen'
          }`}
        >
          <div className="flex flex-col h-full bg-[#FFFFFF] border border-[#D8D4CD] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden font-sans">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#142A35] text-white border-b border-[#142A35]/50">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#7F171D] text-white">
                  <Bot className="h-4 w-4" />
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#142A35]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold tracking-wide uppercase">
                      ISpectra AI Copilot
                    </span>
                    <span className="bg-[#7F171D] text-[9px] font-mono px-1.5 py-0.2 rounded-xs font-bold">
                      FREE
                    </span>
                  </div>
                  <span className="block text-[10px] font-mono text-white/70">
                    Bureau of Indian Standards · Smart AI
                  </span>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1 text-white/80">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body (Hidden if minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F4F1EB] text-xs">
                  
                  {/* Notice Pill */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF] border border-[#D8D4CD] px-3 py-1 rounded-full text-[10px] font-mono text-[#666666]">
                      <Sparkles className="h-3 w-3 text-[#7F171D]" />
                      <span>Free BIS &amp; Tender Intelligence Assistant</span>
                    </span>
                  </div>

                  {/* Messages Stream */}
                  {messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="h-7 w-7 rounded-full bg-[#7F171D] text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="h-3.5 w-3.5" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-xl p-3.5 shadow-xs ${
                            isUser
                              ? 'bg-[#7F171D] text-white rounded-br-xs'
                              : 'bg-[#FFFFFF] text-[#171717] border border-[#D8D4CD] rounded-bl-xs'
                          }`}
                        >
                          <div className="space-y-1 text-xs">
                            {renderFormattedText(msg.text)}
                          </div>

                          <div
                            className={`mt-2 pt-1.5 border-t flex items-center justify-between text-[10px] font-mono ${
                              isUser
                                ? 'border-white/20 text-white/70'
                                : 'border-[#D8D4CD]/60 text-[#888888]'
                            }`}
                          >
                            <span>{msg.timestamp}</span>
                            {!isUser && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleCopy(msg.id, msg.text)}
                                  className="hover:text-[#7F171D] flex items-center gap-1 transition-colors"
                                  title="Copy response"
                                >
                                  {copiedId === msg.id ? (
                                    <>
                                      <Check className="h-3 w-3 text-emerald-600" />
                                      <span className="text-emerald-700">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>

                                {onInsertToAnalyzer && (
                                  <button
                                    onClick={() => onInsertToAnalyzer(msg.text)}
                                    className="hover:text-[#7F171D] flex items-center gap-1 text-[#7F171D] font-bold"
                                    title="Send snippet to Analyzer"
                                  >
                                    <span>To Analyzer</span>
                                    <ArrowRight className="h-2.5 w-2.5" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {isUser && (
                          <div className="h-7 w-7 rounded-full bg-[#142A35] text-white flex items-center justify-center shrink-0 mt-0.5">
                            <User className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing State */}
                  {isLoading && (
                    <div className="flex gap-2.5 justify-start">
                      <div className="h-7 w-7 rounded-full bg-[#7F171D] text-white flex items-center justify-center shrink-0">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                      <div className="bg-[#FFFFFF] border border-[#D8D4CD] rounded-xl rounded-bl-xs p-3.5 shadow-xs flex items-center gap-1.5 text-xs text-[#666666]">
                        <span className="font-mono text-[11px]">Reasoning over BIS catalogue</span>
                        <span className="flex gap-1 ml-1">
                          <span className="h-1.5 w-1.5 bg-[#7F171D] rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 bg-[#7F171D] rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 bg-[#7F171D] rounded-full animate-bounce" />
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Bar */}
                <div className="px-3 py-2 bg-[#FFFFFF] border-t border-[#D8D4CD] overflow-x-auto no-scrollbar">
                  <div className="flex gap-1.5 text-[11px] whitespace-nowrap">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        disabled={isLoading}
                        className="border border-[#D8D4CD] bg-[#F4F1EB] hover:bg-[#FFFFFF] hover:border-[#7F171D] text-[#171717] px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors shrink-0 disabled:opacity-50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="p-3 bg-[#FFFFFF] border-t border-[#D8D4CD] flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about Indian Standards, IS codes, or QCO mandates..."
                    className="flex-1 border border-[#D8D4CD] bg-[#F4F1EB] px-3.5 py-2.5 rounded-lg text-xs font-mono text-[#171717] placeholder-[#888888] focus:border-[#7F171D] focus:outline-none focus:bg-[#FFFFFF]"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="h-9 w-9 flex items-center justify-center bg-[#7F171D] hover:bg-[#5E1116] text-white rounded-lg transition-colors disabled:opacity-40 shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};
