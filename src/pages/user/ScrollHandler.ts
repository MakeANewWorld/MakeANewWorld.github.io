import { debounce } from "lodash";
import { ItemType, MANAGER } from "./ItemHandler";
import { User } from "firebase/auth";

export function debouncedSetScroll(user: User): void {
    debounce(async () => await MANAGER.set(user, ItemType.LAST_SCROLL_INDEX, window.scrollY), 300);
}

export function isScrollToBottom(): boolean {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= (pageHeight - 10)) {
        return true;
    }

    return false;
}

export async function scrollToSave(user: User): Promise<void> {
    window.scrollTo(0, await MANAGER.get(user, ItemType.LAST_SCROLL_INDEX));
}