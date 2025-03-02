import { FirebaseError } from "firebase/app";

export function getErrorTranslate(error: FirebaseError): string {
    // if (!error.code.startsWith("auth/")) throw new Error("Invalid arg: " + error);

    // const subCode = error.code.substring(5);
    // const key = "auth." + subCode
    //     .split("-")
    //     .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    //     .join("");

    // const translated = t(key);
    // if (translated === key) throw new Error("Invalid key: " + key);
    // return translated;
    return error.code;
}
