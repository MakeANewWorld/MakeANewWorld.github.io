import { User } from "firebase/auth";
import { isNullish } from "utility-types";

const key: string = "firebaseUser";

export function saveUser(user: User) {
    localStorage.setItem(key, JSON.stringify(user));
}

export function getUser(): User | null {
    const userJson = localStorage.getItem(key);
    if (isNullish(userJson)) {
        return null;
    }
    return JSON.parse(userJson) as User;
}

export function removeUser() {
    localStorage.removeItem(key);
}