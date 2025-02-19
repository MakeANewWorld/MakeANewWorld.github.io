import { useState, useRef, useEffect, useReducer } from "react";
import { Button } from "react-bootstrap";
import PointRenderer from "./point/PointRenderer";
import { PiTarget } from "react-icons/pi";
import { TaskShop } from "./task/TaskShop";
import { TaskList } from "./task/TaskList";
import { Directory } from "./Directory";

const Top: React.FC<{ title: string, className?: string, setMarkdownContent: (path: string) => void}> = ({ title, setMarkdownContent, className }) => {
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
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    return (
        <div className={className} style={{ zIndex: 1090 }}>
            <Button className="position-fixed top-0 start-0 m-3 py-1 px-2 bg-inverse btn-disable-border bg-inverse-hover shadow bg-inverse-click"
                ref={buttonRef}
                onClick={() => setMenuOpen(!menuOpen)}>
                <PiTarget size='1.3rem' className="hover-re-opt" />
            </Button>
            <PointRenderer />
            <h4 className="m-3 noto">{title}</h4>

            <div ref={menuRef}
                className="position-fixed top-0 start-0 mt-5 ms-3 p-3 rounded bg-inverse shadow"
                style={{ zIndex: 1040, display: menuOpen ? 'block' : 'none' }}>
                <Directory setMarkdownContent={setMarkdownContent} />
                <TaskList forceUpdate={forceUpdate} />
                <TaskShop forceUpdate={forceUpdate} />
            </div>
        </div>
    );
};

export default Top;