import Image from "next/image";
import React, { Suspense } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./mdx.module.css";

const MDX = async ({ content }: any) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Markdown
        className={styles.markdownBody}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                PreTag="div"
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </Suspense>
  );
};

export default MDX;
