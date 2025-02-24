import { useLayoutEffect } from "react";
import { findUser, init } from "./pages/user/User";

export function preload() {
    runTasks();
    init();
    useLayoutEffect(() => {
        const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.body.setAttribute('data-bs-theme', mode);
        (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
    }, []);
    if (!findUser()) {
        if (!window.location.href.endsWith('/user')) {
            window.location.href = '/user';
        }
    } else {
        // const v1 = localStorage.getItem('lastViewedMarkdown');
        // if (v1 !== null && v1 !== undefined) {
        //     setItem("lastViewedMarkdown", v1.toString());
        // }

        // const v2 = localStorage.getItem('stepIndex');
        // if (v2 !== null && v2 !== undefined) {
        //     setItem("stepIndex", v2.toString());
        // }

        // const v3 = localStorage.getItem('userPoints');
        // if (v3 !== null && v3 !== undefined) {
        //     setItem("userPoints", v3.toString());
        // }

        // const v4 = localStorage.getItem('tasks');
        // if (v4 !== null && v4 !== undefined) {
        //     setItem("tasks", v4.toString());
        // }
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