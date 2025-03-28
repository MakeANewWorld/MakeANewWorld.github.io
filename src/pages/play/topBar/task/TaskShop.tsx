import Task, { User } from "@/libs/Task";
import { None } from "./None";
import { useTranslation } from "react-i18next";
import { UnlockButton } from "../button/UnlockButton";
import { Card } from "../cards/Card";

export const TaskShop: React.FC<{ forceUpdate: React.DispatchWithoutAction }> = ({ forceUpdate }) => {
    const { t } = useTranslation();

    if (Task.getAllSelectivityTasks(task => !task.isUnlocked()).length === 0) {
        return (<Card title={`🛒 ${t("task-store")}`}>
            <None/>
        </Card>);
    }

    return (
        <Card title={`🛒 ${t("task-store")}`}>
            {Task.getAllSelectivityTasks(task => !task.isUnlocked()).map(task => (
                <li key={task.getHashCode()} className="flex justify-between items-center px-4 py-3">
                    <p>{task.getTaskName()}</p>
                    <div className="group relative">
                        <UnlockButton canUnlock={task.canUnlock(User.DEFAULT_USER)} task={task} forceUpdate={forceUpdate} />
                        {!task.canUnlock(User.DEFAULT_USER) && (
                            <div className="absolute bottom-full mb-2 hidden group-hover:block left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                                {t("insufficient-balance")}
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </Card>
    );
};