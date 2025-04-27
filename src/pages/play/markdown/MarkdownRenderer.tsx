import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyIcon } from "./copy/CopyIcon";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from 'remark-gfm'
import { checkAndGetUser } from "@/pages/user/User";
import useAsyncEffect from "use-async-effect";
import { scrollToSave } from "@/pages/user/ScrollHandler";

function code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match) {
        const code = String(children).replace(/\n$/, '');
        return <div className="relative">
            <SyntaxHighlighter style={oneDark} PreTag="div" language={match[1]} {...props}>
                {code}
            </SyntaxHighlighter>
            <CopyIcon className="absolute top-2.5 right-2.5" text={children} />
        </div>;
    }
    return <mark className={className + " warning"} {...props}>
        {children}
    </mark>;
}

export const MarkdownRenderer: React.FC<{ markdownContent: string, className: string }> = ({ className, markdownContent }) => {
    useAsyncEffect(async () => await scrollToSave(checkAndGetUser()), [markdownContent]);

    return (
        <Markdown components={{ code }} className={className} remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
            {markdownContent}
        </Markdown>
    );
};