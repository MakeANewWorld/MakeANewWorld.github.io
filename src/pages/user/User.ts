import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { isNullish } from "utility-types";
import { removeUser, saveUser } from "./localStorageHandler";

export let app: FirebaseApp, auth: Auth, database: Database;
let currentUser: User | null;

export function init() {
    const services: Array<any> = [app, auth, database];
    if (services.every(s => !isNullish(s))) return;
    if (!services.every(isNullish)) throw new Error("Inconsistent Firebase initialization");

    const firebaseConfig: FirebaseOptions = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
    };

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);

    auth.onAuthStateChanged(user => {
        if (!isNullish(user)) {
            saveUser(user);
        } else {
            removeUser();
        }
        currentUser = user;
    });

    const storedUser = localStorage.getItem("firebaseUser");
    if (!isNullish(storedUser)) {
        currentUser = JSON.parse(storedUser);
    }
}

function checkState() {
    const services = { app, auth, database } as const;
    Object.entries(services).forEach(([name, service]) => {
        if (isNullish(service)) {
            throw new Error(`${name} not initialized`);
        }
    });
}

export function back() {
    if (history.length > 0) {
        history.back();
    } else {
        location.href = "/";
    }
}

export async function signInWithGoogle() {
    checkState();
    currentUser = (await signInWithPopup(auth as Auth, new GoogleAuthProvider())).user;
}

export async function signInWithEmail(email: string, password: string) {
    checkState();
    currentUser = (await signInWithEmailAndPassword(auth as Auth, email, password)).user;
}

export async function createUserWithEmail(email: string, password: string) {
    checkState();
    currentUser = (await createUserWithEmailAndPassword(auth as Auth, email, password)).user;
}

export function checkAndGetUser(): User {
    if (!findUser()) throw new Error("User not found");
    return currentUser as User;
}

export function findUser(): boolean {
    checkState();
    return currentUser !== null;
}

window.addEventListener("storage", (event) => {
    if (event.key === "firebaseUser") {
        if (!isNullish(event.newValue)) {
            currentUser = JSON.parse(event.newValue);
        } else {
            throw new Error("User can't be null");
        }
    }
});