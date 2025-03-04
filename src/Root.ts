import { useLayoutEffect } from "react";
import { findUser, init } from "./pages/user/User";
import i18next from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

export function preload() {
    init();
    initI18n();
    useLayoutEffect(() => {
        const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.body.setAttribute('data-bs-theme', mode);
        (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
    }, []);
    if (!findUser()) {
        if (!window.location.href.endsWith('/user')) {
            window.location.href = '/user';
        }
    }
}

let inited: boolean = false;

function initI18n() {
    if (!inited) {
        i18next
            .use(Backend)
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                fallbackLng: 'zh-TW',
                debug: import.meta.env.DEV,
                interpolation: {
                    escapeValue: false,
                },
                backend: {
                    loadPath: '/{{ns}}/{{lng}}.json',
                },
                detection: {
                    order: ['navigator', 'querystring', 'cookie', 'localStorage', 'path', 'subdomain'],
                    caches: ['localStorage', 'cookie'],
                },
            });
        inited = true;
    }
}