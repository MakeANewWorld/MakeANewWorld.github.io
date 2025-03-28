import Task from "@/libs/Task";
import { None } from "./task/None";
import { ItemType, MANAGER } from "@/pages/user/ItemHandler";
import { useTranslation } from "react-i18next";
import { checkAndGetUser } from "@/pages/user/User";
import { useEffect } from "react";
import { Card } from "./cards/Card";

export const Directory: React.FC<{ setMarkdownContent: (path: string) => void }> = ({ setMarkdownContent }) => {
    useEffect(() => {
        const lastViewed = MANAGER.getCurrentData()[ItemType.LAST_VIEWED_MARKDOWN];

        if (lastViewed !== undefined) {
            setMarkdownContent(lastViewed);
        }
    }, []);

    const { t } = useTranslation();

    if (Task.getAllSelectivityTasks(task => task.isUnlocked()).length === 0) {
        return (<Card title={`📂 ${t("directory")}`} bottom={false} contentClasses="overflow-y-auto">
            <None/>
        </Card>);
    }

    return (
        <Card title={`📂 ${t("directory")}`} bottom={false} contentClasses="overflow-y-auto">
            {Task.getAllSelectivityTasks(task => task.isUnlocked()).map(task => (
                <li key={task.getHashCode()}
                    className="flex justify-between px-4 py-3 hover:bg-(--primary-foreground) dark:hover:bg-[#2c2c2c] cursor-pointer"
                    onClick={async () => {
                        const path = task.getPath();
                        setMarkdownContent(path);
                        await MANAGER.set(checkAndGetUser(), ItemType.LAST_VIEWED_MARKDOWN, path);
                    }}>
                    <p>{task.getTaskName()}</p>
                </li>
            ))}
        </Card>
    );
};