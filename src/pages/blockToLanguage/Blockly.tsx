import * as Blockly from 'blockly';
import { useEffect, useRef, useState } from 'react';
import { javascriptGenerator } from 'blockly/javascript';
import { changeColor, createDarkTheme, createTheme, findLanguage, LANGUAGE_NAME, LANGUAGE_RTL, languageChange, processToolBox, registerEvent, setWorkspace, workspace } from './BlocklyUtils';
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectItem } from '@radix-ui/react-select';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { setAll } from '@/Root';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyIcon } from '../play/markdown/copy/CopyIcon';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { javaGenerator } from '@/libs/generators/import'

export const BlocklyApp = () => {
    setAll();

    let language = findLanguage();

    const blocklyDivRef = useRef<HTMLDivElement | null>(null);
    const [isScriptExecuted, setScriptExecuted] = useState(false);
    const [selectValue, setSelectValue] = useState(LANGUAGE_NAME[language]);
    const [codes, setCodes] = useState("System.out.println(\"Hello World!\");");

    let { theme } = useTheme();
    if (theme === "system") {
        theme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light"
    }

    let init: boolean = false;

    const src = `./node_modules/blockly/msg/${language}.js`;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => setScriptExecuted(true);
        script.onerror = () => console.error("Failed to load script:", src);
        document.body.appendChild(script);

        return () => { document.body.removeChild(script) };
    }, [src]);

    useEffect(() => {
        if (isScriptExecuted && blocklyDivRef.current && !init) {
            // FIX ME: I don't know why "this" in blockly/msg/**.js is mean window object.
            const msgs: Record<string, string> = (window as any).Blockly.Msg;
            const msgKeys: string[] = Object.keys(msgs);
            for (let i = 0; i < msgKeys.length; i++) {
                const key = msgKeys[i], value = msgs[key];
                Blockly.Msg[key] = value;
            }

            let loadOnce = null;
            try {
                loadOnce = window.sessionStorage.getItem('loadOnceBlocks');
                window.sessionStorage.removeItem('loadOnceBlocks');
                loadOnce = JSON.parse(loadOnce as string);
            } catch (e) {
                console.log(e);
            }

            setWorkspace(Blockly.inject(blocklyDivRef.current, {
                media: './node_modules/blockly/media/',
                toolbox: processToolBox(language),
                rtl: LANGUAGE_RTL.includes(language),
                renderer: 'thrasos',
                trashcan: true,
                theme: theme === 'light' ? createTheme() : createDarkTheme(),
            }));
            Blockly.serialization.workspaces.load(loadOnce || [], workspace as Blockly.WorkspaceSvg);

            const javaKeys = Object.keys(javaGenerator.forBlock), jsKeys = Object.keys(javascriptGenerator.forBlock);
            console.log("Differences:", {
                onlyInJava: javaKeys.filter(key => !jsKeys.includes(key)),
                onlyInJs: jsKeys.filter(key => !javaKeys.includes(key)),
                common: javaKeys.filter(key => jsKeys.includes(key)),
            });

            registerEvent(workspace as Blockly.WorkspaceSvg, () => setCodes(javaGenerator.workspaceToCode(workspace as Blockly.WorkspaceSvg)));
            console.log(javaGenerator);
            changeColor();
            init = true;
        }
    }, [isScriptExecuted]);

    function code(languageName: string, code: string, className?: string) {
        return <div className={"relative " + className}>
            <SyntaxHighlighter style={oneDark} PreTag="div" language={languageName}>
                {String(code).replace(/\n$/, '')}
            </SyntaxHighlighter>
            <CopyIcon className="absolute top-10px right-10px" text={code} />
        </div>;
    }

    return (
        <ThemeProvider storageKey="vite-ui-theme">
            <Select onValueChange={(value) => {
                languageChange(value);
                setSelectValue(LANGUAGE_NAME[value]);
            }}
            >
                <SelectTrigger className="fixed z-80 right-0 m-4">
                    <SelectValue placeholder={selectValue} />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(LANGUAGE_NAME)
                        .sort((a, b) => a[1].localeCompare(b[1]))
                        .map(([langCode, langName]) => (
                            <SelectItem key={langCode} value={langCode}>
                                {langName}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
            <div className='fixed z-80 right-0 m-4 top-10 '>
                {code("java", codes, "min-w-30")}
            </div>
            <div ref={blocklyDivRef} className="w-screen h-screen" />
        </ThemeProvider>
    );
}