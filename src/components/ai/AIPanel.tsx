"use client";
import { useStore, AIMessage } from '@/store/store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, BrainCircuit } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AI_QUICK_PROMPTS } from '@/lib/data';

export function AIPanel() {
  const { isAIOpen, toggleAI, aiMessages, sendAIQuery, isAILoading } = useStore();
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [aiMessages]);

  const handleSend = () => {
    if (!input.trim() || isAILoading) return;
    sendAIQuery(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isAIOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-[55] lg:hidden" onClick={toggleAI} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed right-0 top-0 bottom-0 w-[400px] bg-surface/95 backdrop-blur-xl border-l border-border-primary flex flex-col z-[60] shadow-2xl">
            <div className="p-4 border-b border-border-primary flex items-center justify-between bg-bg-primary/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-indigo flex items-center justify-center shadow-lg shadow-brand-blue/20">
                  <BrainCircuit className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-display text-[14px] font-bold text-text-primary leading-tight">AI Governance Copilot</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse shadow-[0_0_8px_rgba(5,150,105,0.8)]" />
                    <span className="text-[10px] text-brand-emerald font-bold uppercase tracking-wider">Live Analysis</span>
                  </div>
                </div>
              </div>
              <button onClick={toggleAI} className="p-1.5 text-text-tertiary hover:text-text-primary hover:bg-surface rounded-md transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {aiMessages.map((msg: AIMessage) => (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className={cn("max-w-[90%] p-3 rounded-2xl text-[13px] leading-relaxed", msg.role === 'ai' ? "bg-bg-primary border border-border-primary text-text-primary self-start rounded-tl-sm" : "bg-brand-blue text-white self-end rounded-tr-sm shadow-md shadow-brand-blue/20")}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </motion.div>
              ))}
              {isAILoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start bg-bg-primary border border-border-primary rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                  <div className="flex gap-1">{[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}</div>
                  <span className="text-[12px] text-text-tertiary">Analyzing governance data...</span>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>
            <div className="p-3 border-t border-border-primary bg-bg-primary/50">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {AI_QUICK_PROMPTS.map(p => (
                  <button key={p} onClick={() => { setInput(p); }} className="text-[10px] font-semibold text-brand-blue bg-brand-blue-light/50 border border-brand-blue/20 px-2 py-0.5 rounded-full hover:bg-brand-blue hover:text-white transition-colors">{p}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-surface border border-border-primary rounded-xl p-1.5 shadow-sm focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask about risks, KPIs, or actions..." className="flex-1 bg-transparent border-none text-[13px] text-text-primary px-2 outline-none placeholder:text-text-tertiary" />
                <button onClick={handleSend} disabled={isAILoading} className="w-8 h-8 flex items-center justify-center bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors shrink-0 disabled:opacity-50"><Send className="w-3.5 h-3.5 ml-0.5" /></button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
