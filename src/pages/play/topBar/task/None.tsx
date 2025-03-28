import { useTranslation } from "react-i18next";

export const None: React.FC = () => {
    const { t } = useTranslation();
    return (
        <li className="list-none p-3 text-center text-gray-500">
            {t("nothing-here")}
        </li>
    );
};