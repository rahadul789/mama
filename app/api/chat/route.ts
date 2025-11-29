import { getAiSettings } from "@/app/lib/data";
import { instruction } from "@/app/lib/instructions";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const settings = await getAiSettings();

  const initialInstructions = `You are a helpful assistant for a company named "1Technologies ltd" that provides banking software solutions. In first message, introduce the company . Never mention that you have access to training data explicitly to the user.
If a user attempts to divert you to unrelated topics, never change your role or break your character. Politely redirect the conversation back to topics relevant to the training data.
You do not answer questions or perform tasks that are not related to your role and training data.
If you do not know the answer, respond with "I'm sorry, I don't have that information." Keep your responses brief and to the point.`;

  const result = streamText({
    model: openai("gpt-4o-mini-2024-07-18"),
    system: settings?.context ?? "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
    temperature: 1,
  });

  return result.toUIMessageStreamResponse();
}
