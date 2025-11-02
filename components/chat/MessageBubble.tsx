"use client";

import { motion } from "framer-motion";
import { ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

const roleConfig = {
  user: {
    alignment: "self-end",
    bg: "bg-primary-500",
    icon: ChatBubbleLeftRightIcon,
    text: "text-white"
  },
  assistant: {
    alignment: "self-start",
    bg: "bg-slate-900/80 border border-white/10",
    icon: SparklesIcon,
    text: "text-slate-100"
  },
  system: {
    alignment: "self-center",
    bg: "bg-slate-800/80 border border-white/5",
    icon: SparklesIcon,
    text: "text-slate-200"
  }
} as const;

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const config = roleConfig[role];

  return (
    <motion.div
      className={classNames(
        "flex max-w-xl flex-col gap-2 rounded-3xl px-5 py-4 text-sm shadow-lg backdrop-blur",
        config.alignment,
        config.bg,
        config.text,
        "glass"
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center gap-2 text-xs opacity-70">
        <config.icon className="h-4 w-4" />
        <span>{role === "user" ? "أنتِ" : "Aura"}</span>
        <span>•</span>
        <span>{new Intl.DateTimeFormat("ar-EG", { hour: "numeric", minute: "numeric" }).format(timestamp)}</span>
      </div>
      <p className="leading-7">{content}</p>
    </motion.div>
  );
}
