import { ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const None: React.FC<{}> = ({ }) => {
    const { t } = useTranslation();
    return (
        <ListGroup.Item className="text-center text-muted noto">
            {t("nothing-here")}
        </ListGroup.Item>
    );
};