import Task from "@/libs/Task";
import { None } from "./None";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { debouncedSetScroll, isScrollToBottom } from "@/pages/user/ScrollHandler";
import { checkAndGetUser } from "@/pages/user/User";
import { ClaimButton } from "../button/ClaimButton";
import { Prompt } from "../cards/Prompt";
import { Card } from "../cards/Card";

export const TaskList: React.FC<{ forceUpdate: React.DispatchWithoutAction, path: string }> = ({ forceUpdate, path }) => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const handleScroll = async () => {
            debouncedSetScroll(checkAndGetUser());
            setIsBottom(isScrollToBottom());
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { t } = useTranslation();

    if (Task.getAllSelectivityTasks(task => !task.isCompleted() && task.isUnlocked()).length === 0) {
        return (<Card title={`📋 ${t("task")}`}>
            <None />
        </Card>);
    }

    return (
        <Card title={`📋 ${t("task")}`}>
            {Task.getAllSelectivityTasks(task => !task.isCompleted() && task.isUnlocked()).map(task => (
                <li key={task.getHashCode()} className="flex justify-between items-center px-4 py-3 cursor-pointer">
                    <p>{task.getTaskName()}</p>

                    <div className="group relative">
                        <ClaimButton canUnlock={task.getPath() === path && isBottom} task={task} forceUpdate={forceUpdate} />
                        {(task.getPath() !== path || !isBottom) && (
                            <Prompt content={task.getPath() !== path ? t("not-on-task-page") :
                                (!isBottom ? t("not-finished-reading") : '')} />
                        )}
                    </div>
                </li>
            ))}
        </Card>
    );
};