"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  codes: { code: string; language: string; label?: string }[];
  copyButton?: boolean;
}

export const CodeBlock = ({ codes, copyButton = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-border/40 bg-secondary/5 overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
      {codes.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 border-b border-border/40 bg-secondary/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-[0.2em] ml-2">
                {item.label || item.language}
              </span>
            </div>
            {copyButton && (
              <button
                onClick={() => handleCopy(item.code)}
                className="p-2 rounded-lg hover:bg-background/80 transition-all text-muted-foreground hover:text-primary active:scale-95"
                title="Copy code"
              >
                {copied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            )}
          </div>
          <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-border/40 scrollbar-track-transparent">
            <code className="text-foreground/90">{item.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};
