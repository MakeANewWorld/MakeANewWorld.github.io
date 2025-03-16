import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const ConfirmPassword: React.FC<{}> = ({ }) => {
    const { t } = useTranslation();
    return (
        <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
            <Form.Control
                placeholder={t("confirm-password")}
                required
                className="form-control-lg noto"
                aria-label={t("confirm-password")}
            />
        </Form.Group>
    );
};