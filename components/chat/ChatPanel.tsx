"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { bootstrapSystemMessage } from "@/lib/agent";
import { ChatMessage, CreativeSuggestion, MoodboardItem } from "@/lib/types";
import { motion } from "framer-motion";

interface StructuredState {
  suggestions: CreativeSuggestion[];
  moodboard: MoodboardItem[];
  nextActions: string[];
  deliverables: string[];
}

const initialStructured: StructuredState = {
  suggestions: [],
  moodboard: [],
  nextActions: [],
  deliverables: []
};

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [bootstrapSystemMessage()]);
  const [structured, setStructured] = useState<StructuredState>(initialStructured);

  useEffect(() => {
    if (messages.length === 1) {
      const welcome: ChatMessage = {
        id: nanoid(),
        role: "assistant",
        createdAt: Date.now(),
        content:
          "أهلاً بيك! احكيلي عن المشروع اللي حابة نصممه: نوع العلامة، الأهداف، المنصات، وأي ذوق معين في الهوية."
      };
      setMessages((prev) => [...prev, welcome]);
    }
  }, [messages.length]);

  const mutation = useMutation({
    mutationFn: async (history: ChatMessage[]) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      if (!response.ok) {
        throw new Error("تعذر إرسال الرسالة.");
      }

      return response.json() as Promise<{
        message: ChatMessage;
        structured: StructuredState;
      }>;
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data.message]);
      setStructured(data.structured);
    }
  });

  const handleSend = async (content: string) => {
    const newMessage: ChatMessage = {
      id: nanoid(),
      role: "user",
      content,
      createdAt: Date.now()
    };

    setMessages((prev) => [...prev, newMessage]);

    await mutation.mutateAsync([...messages, newMessage]);
  };

  const timeline = useMemo(() => messages.filter((msg) => msg.role !== "system"), [messages]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="glass gradient-border flex flex-col overflow-hidden rounded-[28px] border border-white/5 p-6">
        <div className="flex items-center justify-between pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">MOMENTUM CHAT</p>
            <h2 className="mt-1 text-xl font-semibold text-white">تواصلي مباشرة مع Aura</h2>
          </div>
          <SparklesIcon className="h-7 w-7 text-accent" />
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {timeline.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.createdAt}
            />
          ))}
          {mutation.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="self-start rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200"
            >
              Aura تكتب الآن...
            </motion.div>
          )}
        </div>

        <div className="pt-4">
          <ChatInput onSend={handleSend} disabled={mutation.isPending} />
        </div>
      </div>

      <div className="space-y-6">
        <InsightsPanel structured={structured} isLoading={mutation.isPending} />
      </div>
    </div>
  );
}

interface InsightsPanelProps {
  structured: StructuredState;
  isLoading: boolean;
}

function InsightsPanel({ structured, isLoading }: InsightsPanelProps) {
  return (
    <div className="space-y-6">
      <section className="glass rounded-[28px] border border-white/5 p-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">NEXT STEPS</p>
            <h3 className="mt-1 text-lg font-semibold text-white">خطة التنفيذ</h3>
          </div>
          {isLoading && <div className="h-2 w-2 animate-ping rounded-full bg-accent" />}
        </header>
        <ul className="space-y-3 text-sm text-slate-200">
          {structured.nextActions.length ? (
            structured.nextActions.map((action, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-950/40 px-4 py-3"
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20 font-semibold text-primary-200">
                  {index + 1}
                </span>
                <p>{action}</p>
              </li>
            ))
          ) : (
            <li className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-slate-400">
              أكتبي رسالة للبدء واستلام الخطة التفصيلية.
            </li>
          )}
        </ul>
      </section>

      <section className="glass rounded-[28px] border border-white/5 p-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">DELIVERABLES</p>
            <h3 className="mt-1 text-lg font-semibold text-white">المخرجات المقترحة</h3>
          </div>
        </header>
        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
          {structured.deliverables.length ? (
            structured.deliverables.map((deliverable, index) => (
              <span
                key={index}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white"
              >
                {deliverable}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-dashed border-white/10 px-4 py-2 text-xs text-slate-400">
              قائمة المخرجات تظهر بعد أول محادثة.
            </span>
          )}
        </div>
      </section>

      <section className="glass rounded-[28px] border border-white/5 p-6">
        <header className="mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">IDEATION CARDS</p>
          <h3 className="mt-1 text-lg font-semibold text-white">اقتراحات إبداعية</h3>
        </header>
        <div className="space-y-4">
          {structured.suggestions.length ? (
            structured.suggestions.map((suggestion, index) => (
              <div key={index} className="rounded-3xl border border-white/5 bg-slate-950/50 p-4">
                <h4 className="text-base font-semibold text-white">{suggestion.title}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-300">{suggestion.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                  {suggestion.palette.map((color) => (
                    <span
                      key={color}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1"
                    >
                      <span className="h-3 w-3 rounded-full border border-white/30" style={{ backgroundColor: color }} />
                      {color}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                  {suggestion.typography.map((font) => (
                    <span key={font} className="rounded-full bg-primary-500/20 px-3 py-1 text-primary-100">
                      {font}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                  {suggestion.assets.map((asset) => (
                    <span key={asset} className="rounded-full bg-white/10 px-3 py-1">
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-6 text-center text-slate-400">
              الاقتراحات التفصيلية تظهر بمجرد إرسال وصف المشروع.
            </div>
          )}
        </div>
      </section>

      <section className="glass rounded-[28px] border border-white/5 p-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">MOODBOARD</p>
            <h3 className="mt-1 text-lg font-semibold text-white">خريطة الإلهام</h3>
          </div>
        </header>
        <div className="space-y-4">
          {structured.moodboard.length ? (
            structured.moodboard.map((item, index) => (
              <div key={index} className="grid gap-4 rounded-3xl border border-white/5 bg-slate-950/60 p-4 sm:grid-cols-[160px,1fr]">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/20 text-lg font-bold text-primary-100">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-start gap-3">
                  <div className="flex gap-2">
                    {item.colors.map((color) => (
                      <span
                        key={color}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-[10px] text-white/70"
                        style={{ backgroundColor: color }}
                      >
                        {color.replace("#", "")}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                    {item.keywords.map((keyword) => (
                      <span key={keyword} className="rounded-full bg-white/10 px-3 py-1">
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-6 text-center text-slate-400">
              moodboard يتولد بعد استلام تفاصيل المشروع.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
