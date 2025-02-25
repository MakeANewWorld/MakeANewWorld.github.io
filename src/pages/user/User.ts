import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { Database, get, getDatabase, ref, set } from "firebase/database";

export let app: FirebaseApp | null = null;
export let auth: Auth | null = null;
export let database: Database | null = null;

export let currentUser: User | null = null;

export function init() {
    if (app === null && auth === null && database === null) {
        const firebaseConfig = {
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
        auth = getAuth(app); false
        database = getDatabase(app);

        auth.onAuthStateChanged(user => {
            currentUser = user;
            if (user) {
                localStorage.setItem("firebaseUser", JSON.stringify(user));
            } else {
                localStorage.removeItem("firebaseUser");
            }
        });

        const storedUser = localStorage.getItem("firebaseUser");
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
        }
    } else if (app !== null && auth !== null && database !== null) {
    } else {
        throw new Error("What the hell");
    }
}

function checkState() {
    if (app === null) throw new Error("app not initialized");
    if (auth === null) throw new Error("auth not initialized");
    if (database === null) throw new Error("database not initialized");
}

export async function signInWithEmail(email: string, password: string) {
    checkState();
    currentUser = (await signInWithEmailAndPassword((auth as Auth), email, password)).user;
    localStorage.setItem("firebaseUser", JSON.stringify(currentUser));
}

export async function createUserWithEmail(email: string, password: string) {
    checkState();
    currentUser = (await createUserWithEmailAndPassword((auth as Auth), email, password)).user;
    localStorage.setItem("firebaseUser", JSON.stringify(currentUser));
}

export function checkAndGetUser(): User {
    if (!findUser()) throw new Error("User not found");
    return (currentUser as User);
}

export function findUser(): boolean {
    checkState();
    return currentUser !== null;
}

export async function getItem(key: string): Promise<any> {
    const uid = checkAndGetUser().uid;
    const itemRef = ref((database as Database), `users/${uid}/items/${key}`);
    
    try {
        const snapshot = await get(itemRef);
        if (snapshot.exists()) {
            return snapshot.val().value;
        } else {
            return null;
        }
    } catch (err) {
        console.error("獲取資料失敗:", err);
        return null;
    }
}

export async function setItem(key: string, value: string): Promise<void> {
    const uid = checkAndGetUser().uid;
    const itemRef = ref((database as Database), `users/${uid}/items/${key}`);
    
    try {
        await set(itemRef, { value });
    } catch (err) {
        console.error("設定資料失敗:", err);
    }
}

window.addEventListener("storage", (event) => {
    if (event.key === "firebaseUser") {
        if (event.newValue) {
            currentUser = JSON.parse(event.newValue);
        } else {
            currentUser = null;
        }
    }
});