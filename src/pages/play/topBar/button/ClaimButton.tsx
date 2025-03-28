import Task, { User } from "@/libs/Task";
import { useTranslation } from "react-i18next";

export const ClaimButton: React.FC<{ canUnlock: boolean, task: Task, forceUpdate: React.DispatchWithoutAction }> = ({ canUnlock, task, forceUpdate }) => {
    const { t } = useTranslation();

    return (
        <button className={`ml-3 px-2 py-1 text-sm border rounded 
            ${canUnlock
                ? 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => task.completeTask(User.DEFAULT_USER, forceUpdate)}
            disabled={!canUnlock}>
            {t("claim")} ${task.getPoints()}
        </button>
    );
};