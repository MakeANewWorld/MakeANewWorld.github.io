import { useLayoutEffect } from "react";

export function setColorScheme() {
    useLayoutEffect(() => {
        const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.body.setAttribute('data-bs-theme', mode);
        (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
    }, []);
}