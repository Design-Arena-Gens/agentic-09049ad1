"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useForm } from "react-hook-form";

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void;
  disabled?: boolean;
}

interface ChatFormData {
  message: string;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>({
    defaultValues: { message: "" }
  });

  const submit = handleSubmit(async (data) => {
    if (!data.message.trim()) {
      return;
    }
    await onSend(data.message.trim());
    reset({ message: "" });
  });

  return (
    <form onSubmit={submit} className="flex items-center gap-3 rounded-2xl bg-slate-900/60 p-3 shadow-xl">
      <textarea
        className={classNames(
          "min-h-[60px] flex-1 resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50",
          disabled && "opacity-60"
        )}
        placeholder="اكتبي طلبك بالتفصيل - مثال: عايزة حملة انستجرام لإطلاق منتج جديد..."
        rows={2}
        disabled={disabled || formState.isSubmitting}
        {...register("message")}
      />
      <button
        type="submit"
        disabled={disabled || formState.isSubmitting}
        className="gradient-border rounded-2xl p-[1px] transition-opacity disabled:opacity-50"
      >
        <span className="flex items-center gap-2 rounded-2xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white">
          <PaperAirplaneIcon className="h-5 w-5 -scale-x-100" />
          إرسال
        </span>
      </button>
    </form>
  );
}
