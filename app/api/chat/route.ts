import { createGroq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText } from 'ai';
import fs from 'fs/promises';
import path from 'path';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const PROJECT_ROOT = process.env.GROQ_PROJECT_PATH || 'D:\\growthX\\growthX-media\\project';
const MAX_CONTEXT_CHARS = 11000;
const MAX_FILE_DEPTH = 4;
const ALLOWED_EXTENSIONS = new Set([
  '.md', '.mdx', '.txt', '.json', '.js', '.ts', '.tsx', '.jsx', '.html', '.css', '.yml', '.yaml',
]);
const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules', '.next', 'dist', 'build', 'out']);

function trimText(text: string, maxChars: number) {
  return text.length <= maxChars ? text : `${text.slice(0, maxChars - 3)}...`;
}

async function collectProjectContext(rootPath: string) {
  const buffer: string[] = [];
  let totalLength = 0;

  async function visit(currentPath: string, depth = 0) {
    if (depth > MAX_FILE_DEPTH || totalLength >= MAX_CONTEXT_CHARS) {
      return;
    }

    let entries;
    try {
      entries = await fs.readdir(currentPath, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (totalLength >= MAX_CONTEXT_CHARS) break;

      const resolvedPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name)) continue;
        await visit(resolvedPath, depth + 1);
        continue;
      }

      if (!entry.isFile()) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) continue;

      try {
        const raw = await fs.readFile(resolvedPath, 'utf-8');
        const snippet = trimText(raw.trim(), 2500);
        const section = `### ${path.relative(rootPath, resolvedPath)}\n${snippet}\n`;

        buffer.push(section);
        totalLength += section.length;
      } catch {
        continue;
      }
    }
  }

  await visit(rootPath);

  if (buffer.length === 0) {
    return `Unable to load project source context from the project source files.`;
  }

  return buffer.join('\n');
}

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const uiMessages = Array.isArray(payload?.messages) ? payload.messages : [];

    if (uiMessages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 });
    }

    const messages = await convertToModelMessages(uiMessages);

    const projectContext = await collectProjectContext(PROJECT_ROOT);
    const systemPrompt = `You are the BuildBlock Dev Studio AI Assistant. You are a highly skilled web developer who helps users build cinematic, luxurious websites. Use the local project source context loaded from ${PROJECT_ROOT} when answering questions about the project. Do not hallucinate details outside of the provided context. Be concise and professional, and point the user to the contact form for project inquiries.`;

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: `${systemPrompt}\n\n${projectContext}`,
      messages,
      timeout: maxDuration * 1000,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: uiMessages,
      sendFinish: true,
      sendStart: true,
    });
  } catch (error) {
    console.error('AI Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    );
  }
}
