import { proxy } from "valtio";
import { ref, get, set, DatabaseReference } from "firebase/database";
import { database } from "./User";
import { User } from "firebase/auth";
import Task from "@/libs/Task";

export enum ItemType {
    USER_POINTS = 'userPoints',
    LAST_VIEWED_MARKDOWN = 'lastViewedMarkdown',
    STEP_INDEX = 'stepIndex',
    TASKS = 'tasks',
    LAST_SCROLL_INDEX = 'lastScrollIndex',
}

export interface TypeMap {
    [ItemType.USER_POINTS]: number;
    [ItemType.LAST_VIEWED_MARKDOWN]: string;
    [ItemType.STEP_INDEX]: number;
    [ItemType.TASKS]: Task[];
    [ItemType.LAST_SCROLL_INDEX]: number;
}

export const DEFAULT_VALUES: TypeMap = {
    [ItemType.USER_POINTS]: 0,
    [ItemType.LAST_VIEWED_MARKDOWN]: '',
    [ItemType.STEP_INDEX]: 0,
    [ItemType.TASKS]: [],
    [ItemType.LAST_SCROLL_INDEX]: 0,
};

const state = proxy<Partial<TypeMap>>({});

export class ClientDataHandler {
    async get<K extends ItemType>(user: User, type: K): Promise<TypeMap[K]> {
        if (state[type] !== undefined) return state[type] as TypeMap[K];

        const snapshot = await get(this.getRef(user, type));
        const value: TypeMap[K] = snapshot.exists() ? JSON.parse(snapshot.val()) : DEFAULT_VALUES[type];

        state[type] = value;
        return value;
    }

    async set<K extends ItemType>(user: User, type: K, value: TypeMap[K]): Promise<void> {
        await set(this.getRef(user, type), JSON.stringify(value));
        state[type] = value;
    }

    private getRef(user: User, type: ItemType): DatabaseReference {
        return ref(database, `users/${user.uid}/items/${type}`);
    }

    getCurrentData(): Required<TypeMap> {
        return state as TypeMap;
    }

    /**
     * Automatically fetch all defined item types
     * @param user The current user
     * @returns Promise resolving to the full data map
     */
    async fetchOfTypes(user: User, types: ItemType[]): Promise<TypeMap> {
        const fetchPromises = types.map(
            type => this.get(user, type as ItemType)
        );

        await Promise.all(fetchPromises);

        return state as TypeMap;
    }
}

export const MANAGER = new ClientDataHandler();

export let markdowns: Record<string, string> = {};

export function setMarkdowns(mk: Record<string, string>): void {
    markdowns = mk;
}