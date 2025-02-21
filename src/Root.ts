import { useLayoutEffect } from "react";

export function preload() {
    runTasks();
    useLayoutEffect(() => {
        const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.body.setAttribute('data-bs-theme', mode);
        (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
    }, []);
}

export interface Task {
    runnable: () => void;
}

const TASK_LIST: Task[] = [];

export function addTask(task: Task): void {
    TASK_LIST.push(task);
}

export function runTasks(): void {
    setInterval(() => TASK_LIST.forEach(task => task.runnable()), 100);
}