import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  ShieldCheck,
  Scale,
  FileSearch,
  Cpu,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { sendChatMessage } from '../api/chat';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  model?: string;
}

interface AiCopilotSectionProps {
  onInsertToAnalyzer?: (text: string) => void;
}

const CAPABILITY_PILLARS = [
  {
    icon: FileSearch,
    title: 'Natural Language Search',
    description: 'Ask questions in conversational language. Discover exact Indian Standards without knowing the IS number in advance.'
  },
  {
    icon: Scale,
    title: 'Gazette & QCO Legal Defense',
    description: 'Instantly identifies withdrawn or superseded standards and warns of mandatory Quality Control Orders under MeitY & DPIIT.'
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Hallucination Grounding',
    description: 'Quotes verbatim Bureau of Indian Standards Clause 1 scope definitions to back every tender citation.'
  }
];

const PRESET_QUERIES = [
  {
    label: '90W LED Luminaire Standards',
    query: 'Which Indian Standards and testing protocols apply to a 90W outdoor LED street luminaire?'
  },
  {
    label: 'Is IS 1944 Withdrawn?',
    query: 'Is IS 1944 still valid for public street lighting tenders, or has it been withdrawn by BIS?'
  },
  {
    label: 'Solar PV Module QCO Mandates',
    query: 'What are the mandatory BIS standards and QCO requirements for crystalline silicon solar PV modules?'
  },
  {
    label: 'Surgical Face Mask Testing',
    query: 'What bacterial filtration and differential pressure standards are required for surgical face masks under BIS?'
  }
];

export const AiCopilotSection: React.FC<AiCopilotSectionProps> = ({ onInsertToAnalyzer }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      sender: 'assistant',
      text: 'Namaste! I am the **ISpectra AI Copilot**, powered by Gemini with the Bureau of Indian Standards knowledge base. Ask me about Indian Standards (IS), mandatory QCOs, or tender eligibility requirements.',
      timestamp: 'Active Now',
      model: 'gemini-3.8-flash'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async (queryText = inputMessage) => {
    const textToSend = queryText.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(textToSend);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: response.model || 'gemini-3.8-flash'
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Unable to connect to AI engine. Please verify your query or select a preset prompt below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block leading-relaxed min-h-[1.2em]">
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-[#171717]">
                  {p.slice(2, -2)}
                </strong>
              );
            }
            if (p.startsWith('*') && p.endsWith('*')) {
              return (
                <em key={pIdx} className="italic text-[#444444]">
                  {p.slice(1, -1)}
                </em>
              );
            }
            return p;
          })}
        </span>
      );
    });
  };

  return (
    <section id="ai-copilot" className="relative bg-[#142A35] text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#7F171D]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#7F171D] text-white px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>MAJOR AI FEATURE · POWERED BY GEMINI 3.8 FLASH</span>
          </div>
          
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Conversational Standards Intelligence Copilot
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            A free, dedicated AI Copilot trained on the Bureau of Indian Standards (BIS) catalogue, gazette supersessions, and compulsory Quality Control Orders (QCOs). Ask questions, verify tender clauses, and receive grounded answers.
          </p>
        </div>

        {/* 2-Column Split: Capabilities Deck vs Live Embedded Chat Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3 Core Pillars & Preset Triggers */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3 Pillars */}
            <div className="space-y-3">
              {CAPABILITY_PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-5 rounded-xl hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-lg bg-[#7F171D] text-white shrink-0">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-300 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Try Presets */}
            <div className="border border-white/10 bg-white/5 p-4 sm:p-5 rounded-xl">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold mb-3 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                <span>TRY A SAMPLE QUESTION (ONE-CLICK):</span>
              </div>
              <div className="space-y-2">
                {PRESET_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.query)}
                    disabled={isLoading}
                    className="w-full text-left p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-300/50 text-xs font-mono text-gray-200 transition-all flex items-center justify-between group disabled:opacity-50"
                  >
                    <span className="truncate pr-2">{item.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-amber-300 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Embedded AI Chat Console */}
          <div className="lg:col-span-7 border border-[#D8D4CD]/20 bg-[#FFFFFF] text-[#171717] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[560px] sm:h-[620px]">
            
            {/* Terminal Header */}
            <div className="px-5 py-4 bg-[#F4F1EB] border-b border-[#D8D4CD] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#7F171D] text-white">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#FFFFFF]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-extrabold text-[#171717] uppercase tracking-wide">
                      ISpectra Live AI Console
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#666666]">
                    Model: Gemini 3.8 Flash · BIS Grounded
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-[#666666] bg-[#FFFFFF] border border-[#D8D4CD] px-2.5 py-1 rounded-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-[#7F171D]" />
                <span>GAZETTE AUDITED</span>
              </div>
            </div>

            {/* Terminal Chat Stream */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F4F1EB]/50 text-xs">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="h-8 w-8 rounded-lg bg-[#7F171D] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-xl p-4 shadow-xs ${
                        isUser
                          ? 'bg-[#7F171D] text-white rounded-br-xs'
                          : 'bg-[#FFFFFF] text-[#171717] border border-[#D8D4CD] rounded-bl-xs'
                      }`}
                    >
                      <div className="space-y-1.5 text-xs sm:text-sm">
                        {renderFormattedText(msg.text)}
                      </div>

                      <div
                        className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-mono ${
                          isUser ? 'border-white/20 text-white/70' : 'border-[#D8D4CD]/60 text-[#888888]'
                        }`}
                      >
                        <span>{msg.timestamp}</span>

                        {!isUser && (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleCopy(msg.id, msg.text)}
                              className="hover:text-[#7F171D] flex items-center gap-1 font-semibold transition-colors"
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
                                className="text-[#7F171D] hover:underline flex items-center gap-1 font-bold"
                              >
                                <span>Send to Analyzer</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="h-8 w-8 rounded-lg bg-[#7F171D] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#D8D4CD] rounded-xl rounded-bl-xs p-4 shadow-xs flex items-center gap-2 text-xs text-[#666666]">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#7F171D]" />
                    <span className="font-mono">Analyzing Bureau of Indian Standards records...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Terminal Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 sm:p-4 bg-[#FFFFFF] border-t border-[#D8D4CD] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about any Indian Standard, tender clause, or mandatory test..."
                className="flex-1 border border-[#D8D4CD] bg-[#F4F1EB] px-4 py-3 rounded-lg text-xs sm:text-sm font-mono text-[#171717] placeholder-[#888888] focus:border-[#7F171D] focus:outline-none focus:bg-[#FFFFFF]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="h-11 px-5 flex items-center justify-center gap-2 bg-[#7F171D] hover:bg-[#5E1116] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-40 shrink-0 shadow-xs"
              >
                <span>Ask AI</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
