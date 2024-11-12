import { Suspense } from "react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeRewrite from "rehype-rewrite";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Anchor } from "@mantine/core";
import styles from "./mdx.module.css";

const MDX = ({ content, owner, name, branch }: any) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <Markdown
        className={styles.markdownBody}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeRewrite,
            {
              rewrite: (node: any) => {
                const githubBaseUrl = `https://raw.githubusercontent.com/${owner}/${name}/${branch}/`;
                if (
                  node.tagName === "img" &&
                  node.properties.src?.startsWith("src/")
                ) {
                  node.properties.src = githubBaseUrl + node.properties.src;
                }
              },
            },
          ],
        ]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                PreTag="div"
                style={vs2015}
                showLineNumbers
                wrapLongLines
                wrapLines
                language={match[1] || "bash"}
                customStyle={{
                  borderRadius: "var(--mantine-radius-md)",
                  padding: "var(--mantine-spacing-lg)",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
          a: ({ node, ...props }: any) => (
            <Anchor href={props.href} target="_blank" display="inline-block">
              {props.children}
            </Anchor>
          ),
        }}
      >
        {content}
      </Markdown>
    </Suspense>
  );
};

export default MDX;
