import { TFunction } from "i18next";

interface LinkItem {
    href: string;
    textKey: string;
    external?: boolean;
}

export const Links: React.FC<{ t: TFunction<"translation", undefined> }> = ({ t }) => {
    const links: LinkItem[] = [
        { href: "/", textKey: "home" },
        { href: "https://github.com/MakeANewWorld/MakeANewWorld.github.io", textKey: "github", external: true },
        { href: "/about", textKey: "about" },
        { href: "/play", textKey: "play" },
    ];

    return (
        <>
            {links.map(({ href, textKey, external }) => (
                <li key={href} className="nav-item">
                    <a href={href} 
                        className="nav-link px-2 text-body-secondary" 
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                        {t(textKey)}
                    </a>
                </li>
            ))}
        </>
    );
};