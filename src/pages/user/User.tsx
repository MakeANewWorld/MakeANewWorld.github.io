import { useRef, useState } from 'react';
import { setAll } from '../../Root';
import { back, createUserWithEmail, signInWithEmail, signInWithGoogle } from './User';
import { FcGoogle } from "react-icons/fc";
import { FirebaseError } from 'firebase/app';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@/components/theme-provider';
import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PasswordInput } from './PasswordInput';

export const User: React.FC<{}> = ({ }) => {
    setAll();

    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [okMessage, setOkMessage] = useState<string | null>(null);

    const [isLogin, setIsLogin] = useState(true);
    const mailRef = useRef<HTMLInputElement>(null), passwordRef = useRef<HTMLInputElement>(null), confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (mailRef.current === null || passwordRef.current === null) throw new Error("Ref is null");
            if (isLogin) {
                await signInWithEmail(mailRef.current.value, passwordRef.current.value);
                setOkMessage("✔️ " + t("login-success"));
            } else {
                if (confirmPasswordRef.current === null || passwordRef.current.value !== confirmPasswordRef.current.value) throw new Error("Passwords not match");
                await createUserWithEmail(mailRef.current.value, passwordRef.current.value);
                setOkMessage("✔️ " + t("register-login-success"));
            }
            setErrorMessage(null);
            back();
        } catch (error: any) {
            setOkMessage(null);
            const message = error instanceof FirebaseError ? error.code : error.message,
                action = t(isLogin ? "login" : "sign-up");
            setErrorMessage(`❌ ${action} ${t("failure")}: ${message}`);
        }
    };

    const googleLogin = async () => {
        try {
            if (mailRef.current === null || passwordRef.current === null) throw new Error("Ref is null");
            await signInWithGoogle();
            setErrorMessage(null);
            back();
        } catch (error: any) {
            setOkMessage(null);
            const message = error instanceof FirebaseError ? error.code : error.message,
                action = t(isLogin ? "login" : "sign-up");
            setErrorMessage(`❌ ${action} ${t("failure")}: ${message}`);
        }
    };

    return (
        <ThemeProvider storageKey="vite-ui-theme">
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className={cn("flex flex-col gap-6")}>
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <a href="#" className="flex flex-col items-center gap-2 font-medium">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                            <GalleryVerticalEnd className="size-6" />
                                        </div>
                                        <span className="sr-only">{t('site-name')}</span>
                                    </a>
                                    <h1 className="text-xl font-bold">{t("welcome")}</h1>
                                    <div className="text-center text-sm">
                                        {isLogin ? t("no-account") : t("have-account")}{" "}
                                        <a className="underline underline-offset-4 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                                            {t("sign-up")}
                                        </a>
                                    </div>
                                </div>
                                {okMessage != null && <Alert>
                                    <AlertDescription className='text-green-300'>{okMessage}</AlertDescription>
                                </Alert>}
                                {errorMessage != null && <Alert>
                                    <AlertDescription className='text-red-300'>{errorMessage}</AlertDescription>
                                </Alert>}
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">{t("email")}</Label>
                                        <Input
                                            ref={mailRef}
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            autoComplete='username'
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">{t("password")}</Label>
                                        <PasswordInput isConfirm={false} ref={passwordRef} isLogin={isLogin} />
                                    </div>
                                    {!isLogin &&
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirm-password">{t("confirm-password")}</Label>
                                            <PasswordInput isConfirm={true} ref={confirmPasswordRef} isLogin={isLogin} />
                                        </div>}
                                    <Button className="w-full">
                                        {isLogin ? t("login") : t("sign-up")}
                                    </Button>
                                </div>
                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        {t("or")}
                                    </span>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-1">
                                    <Button variant="outline" className="w-full" onClick={googleLogin}>
                                        <FcGoogle />
                                        {t("continue-with-google")}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};