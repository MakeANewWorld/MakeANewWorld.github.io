import { FaCheck, FaRegCopy } from "react-icons/fa6";
import './CopyIcon.css';
import { useState } from "react";

function copy(text: string, setFunction: React.Dispatch<React.SetStateAction<boolean>>) {
    navigator.clipboard.writeText(text);
    setFunction(true);
    setTimeout(() => setFunction(false), 1000);
}

export const CopyIcon: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
    const [copied, setCopied] = useState(false);
    if (!copied) {
        return <FaRegCopy id='copy-icon' onClick={() => copy(text, setCopied)} className={className} />;
    }
    return <FaCheck className={className} id='check-icon' />;
};