import { isMobile } from "react-device-detect";

export interface WindowSize {
    width: number;
    height: number;
}

export default class WindowSizeUtils {
    private static windowSize: WindowSize = { width: window.outerWidth, height: window.outerHeight };
    public static readonly tolerance: number = 30;
    private static setIsSplitFunc: React.Dispatch<React.SetStateAction<boolean>> | null;

    public static getWidth(): number {
        return WindowSizeUtils.windowSize.width;
    }

    public static getHeight(): number {
        return WindowSizeUtils.windowSize.height;
    }

    public static setWindowSize(window: Window): void {
        WindowSizeUtils.windowSize.width = window.outerWidth;
        WindowSizeUtils.windowSize.height = window.outerHeight;
    }

    public static handleResize(): void {
        WindowSizeUtils.setWindowSize(window);
        WindowSizeUtils.showObj();
    }

    public static showObj(): void {
        if (window.location.href.includes('localhost:') || window.location.href.includes('127.0.0.1:') || isMobile) { 
            WindowSizeUtils.setIsSplit(true);
            return; 
        }
        
        const halfScreenWidth: number = window.screen.availWidth / 2;
        const screenHeight: number = window.screen.availHeight;

        if (Math.abs(WindowSizeUtils.getWidth() - halfScreenWidth) < WindowSizeUtils.tolerance) {
            if (Math.abs(WindowSizeUtils.getHeight() - screenHeight) < WindowSizeUtils.tolerance) {
                WindowSizeUtils.setIsSplit(true);
            } else {
                WindowSizeUtils.setIsSplit(false);
            }
        } else {
            WindowSizeUtils.setIsSplit(false);
        }
    }

    public static setIsSplit(isSplit: boolean): void {
        if (WindowSizeUtils.setIsSplitFunc) {
            WindowSizeUtils.setIsSplitFunc(isSplit);
        } else {
            throw new Error('setIsSplitFunc is not ready.');
        }
    }

    public static registerEvent(setIsSplitFunc: React.Dispatch<React.SetStateAction<boolean>>): void {
        WindowSizeUtils.setIsSplitFunc = setIsSplitFunc;
        window.addEventListener('resize', WindowSizeUtils.handleResize);
        screen.orientation.addEventListener('change', WindowSizeUtils.handleResize);
    }

    public static unregisterEvent(): void {
        WindowSizeUtils.setIsSplitFunc = null;
        window.removeEventListener('resize', WindowSizeUtils.handleResize);
        screen.orientation.addEventListener('change', WindowSizeUtils.handleResize);
    }
}