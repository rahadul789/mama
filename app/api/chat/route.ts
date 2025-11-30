import { getAiSettings, getSettingDetails } from "@/app/lib/data";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const [settings, cfg] = await Promise.all([
    getAiSettings(),
    getSettingDetails(),
  ]);

  const openai = createOpenAI({
    apiKey: cfg.OPENAI_API_KEY,
  });

  const result = streamText({
    model: openai("gpt-4o-mini-2024-07-18"),
    system: settings?.context ?? "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
    temperature: 1,
  });

  return result.toUIMessageStreamResponse();
}
