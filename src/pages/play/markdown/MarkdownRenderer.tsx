import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyIcon from "./copy/CopyIcon";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from 'remark-gfm'

type MarkdownRendererProps = {
    markdownContent: string,
    path: string,
    className: string
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

export default function MarkdownRenderer({ className, markdownContent }: MarkdownRendererProps) {
    // useEffect(() => {
    //     const a = async () => {
    //         const savedScroll = await getItem(`scroll-${path}`);
    //         if (savedScroll) {
    //             (document.querySelector(".mkd") as HTMLElement).scrollTop = parseInt(savedScroll, 10);
    //         }
    //     };
    //     a();
    // }, [path]);

    // useEffect(() => {
    //     const handleScroll = async () => {
    //        await setItem(`scroll-${path}`, (document.querySelector(".mkd") as HTMLElement).scrollTop.toString());
    //     };
    //     (document.querySelector(".mkd") as HTMLElement).addEventListener("scroll", handleScroll);
    //     return () => (document.querySelector(".mkd") as HTMLElement).removeEventListener("scroll", handleScroll);
    // }, [path]);

    return (
        <Markdown components={{ code }} className={className} remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
            {markdownContent}
        </Markdown>
    );
}
