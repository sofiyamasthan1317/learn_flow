import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
      prose-h1:text-3xl prose-h1:mb-6
      prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
      prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
      prose-li:text-gray-600 dark:prose-li:text-gray-300
      prose-strong:text-gray-900 dark:prose-strong:text-white
      prose-code:text-brand-600 dark:prose-code:text-brand-400
      prose-code:bg-brand-50 dark:prose-code:bg-brand-900/20
      prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-pre:p-0 prose-pre:bg-transparent
    ">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="!rounded-xl !text-sm !my-4"
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
      </ReactMarkdown>
    </div>
  );
}