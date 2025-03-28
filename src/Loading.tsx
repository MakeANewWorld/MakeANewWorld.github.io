import 'ldrs/ring'

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            'l-ring': {
                size?: string | number
                color?: string | number
                speed?: string | number
                stroke?: string | number
            }
        }
    }
}

export const Loading: React.FC<{ isLoading: boolean, theme: string }> = ({ isLoading, theme }) => {
    const isDark = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : theme === "isDark";
    return (
        <div
            className={"fixed inset-0 flex items-center justify-center bg-opacity-50 "}
            aria-live="polite"
            aria-busy={isLoading}
        >
            {isLoading && (
                <l-ring
                    size="40"
                    stroke="5"
                    bg-opacity="0"
                    speed="2"
                    color={isDark ? "white" : "black"}
                ></l-ring>
            )}
        </div>
    );
}