import Task, { User } from "@/libs/Task";
import { useTranslation } from "react-i18next";

export const UnlockButton: React.FC<{ canUnlock: boolean, task: Task, forceUpdate: React.DispatchWithoutAction }> = ({ canUnlock, task, forceUpdate }) => {
    const { t } = useTranslation();

    return (
        <button className={`ml-3 px-2 py-1 text-sm border rounded 
            ${canUnlock
                ? 'border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-950'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => task.unlockTask(User.DEFAULT_USER, forceUpdate)}
            disabled={!canUnlock}>
            {t("unlock")} (${task.getUnlockPoints()})
        </button>
    );
};