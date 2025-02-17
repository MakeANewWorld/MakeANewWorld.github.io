import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './MarkdownRenderer.css';
import CopyIcon from "./copy/CopyIcon";

type MarkdownRendererProps = {
    markdownContent: string,
    className?: string,
    setTitle: (title: string) => void
};

function code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');

    if (!inline && match) {
        const code = String(children).replace(/\n$/, '');

        return <div className="position-relative">
            <SyntaxHighlighter style={oneDark} PreTag="div" language={match[1]} {...props}>
                {code}
            </SyntaxHighlighter>
            <CopyIcon className="position-absolute top-10px right-10px" text={children} />
        </div>;
    }

    return <code className={className} {...props}>
        {children}
    </code>;
}

export default function MarkdownRenderer({ className, markdownContent, setTitle }: MarkdownRendererProps) {
    setTitle(markdownContent.split('\n')[0].replace('/r', ''));
    
    return (
        <Markdown components={{ code }} className={className}>
            {markdownContent}
        </Markdown>
    );
}
