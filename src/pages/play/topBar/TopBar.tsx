import { useState, useRef, useEffect, useReducer } from "react";
import { PointRenderer } from "./point/PointRenderer";
import { PiTarget } from "react-icons/pi";
import { TaskShop } from "./task/TaskShop";
import { TaskList } from "./task/TaskList";
import { Directory } from "./Directory";

export const Top: React.FC<{ title: string, className?: string, setMarkdownContent: (path: string) => void, path: string }> = ({ title, setMarkdownContent, className, path }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [menuOpen]);

    return (
        <div className={`${className} flex-row items-center justify-between w-full z-50`}>
            <button
                className="relative top-0 left-0 m-3 py-1 px-2 border-0 shadow-sm dark:shadow-[0_1px_3px_0px_rgba(255,255,255,0.1)] rounded focus:outline-none"
                ref={buttonRef}
                onClick={() => setMenuOpen(!menuOpen)}>
                <PiTarget size='1.3rem' className="hover:opacity-80 transition-opacity" />
            </button>
            <h5 className="flex-grow">{title}</h5>
            <PointRenderer />
            <div
                ref={menuRef}
                className={`fixed top-0 left-0 mt-11 ml-3 p-3 rounded shadow dark:shadow-[0_1px_3px_0px_rgba(255,255,255,0.1)] bg-white dark:bg-[#121212] ${menuOpen ? 'block' : 'hidden'}`}>
                <TaskList forceUpdate={forceUpdate} path={path} />
                <TaskShop forceUpdate={forceUpdate} />
                <Directory setMarkdownContent={setMarkdownContent} />
            </div>
        </div>
    );
};