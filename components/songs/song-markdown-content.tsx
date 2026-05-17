"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type SongMarkdownContentProps = {
  content: string;
};

function hasMarkdownSyntax(content: string): boolean {
  const normalized = content.trim();

  if (!normalized) {
    return false;
  }

  return (
    /^```[\s\S]*```$/m.test(normalized) ||
    /^#{1,6}\s+/m.test(normalized) ||
    /^\s*[-*+]\s+/m.test(normalized) ||
    /^\s*\d+\.\s+/m.test(normalized) ||
    /\[[^\]]+\]\([^\)]+\)/.test(normalized) ||
    /\|.+\|/.test(normalized)
  );
}

export function SongMarkdownContent({ content }: SongMarkdownContentProps) {
  if (!hasMarkdownSyntax(content)) {
    return (
      <div style={{ width: '100%', overflowX: 'visible' }}>
        <pre
          className="whitespace-pre pb-4 font-mono leading-7 text-slate-800"
          style={{
            fontSize: 'clamp(10px, 3vw, 1rem)',
            display: 'block',
            width: '100%',
            margin: 0,
          }}
        >
          {content}
        </pre>
      </div>
    );
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        h1: ({ ...props }) => <h1 className="mb-4 text-2xl font-semibold text-slate-900" {...props} />,
        h2: ({ ...props }) => <h2 className="mb-3 text-xl font-semibold text-slate-900" {...props} />,
        h3: ({ ...props }) => <h3 className="mb-2 text-lg font-semibold text-slate-900" {...props} />,
        p: ({ ...props }) => <p className="whitespace-pre-wrap leading-7 text-slate-800" {...props} />,
        ul: ({ ...props }) => <ul className="ml-5 list-disc space-y-1 text-slate-800" {...props} />,
        ol: ({ ...props }) => <ol className="ml-5 list-decimal space-y-1 text-slate-800" {...props} />,
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match?.[1];

          if (language) {
            return (
              <SyntaxHighlighter
                style={oneLight}
                language={language}
                PreTag="div"
                customStyle={{
                  margin: "0.5rem 0",
                  borderRadius: "0.75rem",
                  border: "1px solid rgb(226 232 240)",
                  fontSize: "0.82rem",
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }

          return (
            <code
              className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.82rem] text-slate-800"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
