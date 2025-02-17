import { FaCheck, FaRegCopy } from "react-icons/fa6";
import './CopyIcon.css';
import { useState } from "react";

type MarkdownRendererProps = {
    text: string,
    className?: string
};

function copy(text: string, setFunction: React.Dispatch<React.SetStateAction<boolean>>) {
    navigator.clipboard.writeText(text);
    setFunction(true);
    setTimeout(() => setFunction(false), 1000);
}

export default function CopyIcon({ text, className }: MarkdownRendererProps) {
    const [copied, setCopied] = useState(false);
    if (!copied) {
        return <FaRegCopy id='copy-icon' onClick={() => copy(text, setCopied)} className={className} />;
    }
    return <FaCheck className={className} id='check-icon' />;
}