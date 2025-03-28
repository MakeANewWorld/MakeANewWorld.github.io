import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    ref: React.RefObject<HTMLInputElement | null>,
    isConfirm: boolean,
    isLogin: boolean,
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ isConfirm, isLogin }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePassword = () => setPasswordVisible(!passwordVisible);

    return (
        <div className="relative">
            <Input
                ref={ref}
                id={isConfirm ? "confirm-password" : "password"}
                type={passwordVisible ? "text" : "password"}
                placeholder="••••••••"
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <Button
                type="button"
                variant="ghost"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePassword}
            >
                {passwordVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </Button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
