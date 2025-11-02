import { NextResponse } from "next/server";
import { z } from "zod";
import { generateAgentResponse } from "@/lib/agent";
import { ChatMessage } from "@/lib/types";
import { nanoid } from "nanoid";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        id: z.string().optional(),
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
        createdAt: z.number().optional()
      })
    )
    .nonempty("Conversation is required.")
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = chatSchema.parse(data);
    const history: ChatMessage[] = parsed.messages.map((message) => ({
      ...message,
      id: message.id ?? nanoid(),
      createdAt: message.createdAt ?? Date.now()
    }));
    const latest = history[history.length - 1];

    if (latest.role !== "user") {
      return NextResponse.json(
        { error: "آخر رسالة يجب أن تكون من المستخدم." },
        { status: 400 }
      );
    }

    const response = generateAgentResponse(history, latest);

    return NextResponse.json({
      message: {
        id: nanoid(),
        role: "assistant",
        content: response.reply,
        createdAt: Date.now()
      },
      structured: {
        suggestions: response.suggestions,
        moodboard: response.moodboard,
        nextActions: response.nextActions,
        deliverables: response.deliverables
      }
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "تعذر توليد الرد، حاول مرة أخرى لاحقاً." },
      { status: 500 }
    );
  }
}
