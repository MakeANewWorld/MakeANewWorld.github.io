import { useLayoutEffect } from "react";

export function preload() {
    runTasks();
    useLayoutEffect(() => {
        const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.body.setAttribute('data-bs-theme', mode);
        (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
    }, []);
    if (localStorage.getItem('token') === null) {
        if (!window.location.href.endsWith('/user')) {
            window.location.href = '/user';
        }
    } else {
        const v1 = localStorage.getItem('lastViewedMarkdown');
        if (v1 !== null && v1 !== undefined) {
            setItem("lastViewedMarkdown", v1.toString());
        }

        const v2 = localStorage.getItem('stepIndex');
        if (v2 !== null && v2 !== undefined) {
            setItem("stepIndex", v2.toString());
        }

        const v3 = localStorage.getItem('userPoints');
        if (v3 !== null && v3 !== undefined) {
            setItem("userPoints", v3.toString());
        }

        const v4 = localStorage.getItem('tasks');
        if (v4 !== null && v4 !== undefined) {
            setItem("tasks", v4.toString());
        }
    }
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

export async function getItem(key: string): Promise<any> {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://ouo.freeserver.tw:24200/getItem", {
            method: "POST",
            headers: { "Authorization": "Bearer " + token },
            body: JSON.stringify({ key })
        });
        const data = await response.json();
        return data.value;
    } catch (err) {
        return null;
    }
}

export async function setItem(key: string, value: string): Promise<void> {
    const token = localStorage.getItem("token");
    const response = await fetch("http://ouo.freeserver.tw:24200/setItem", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token },
        body: JSON.stringify({ key, value })
    });
    if (!response.ok) {
        throw new Error("Failed to set item");
     }
}