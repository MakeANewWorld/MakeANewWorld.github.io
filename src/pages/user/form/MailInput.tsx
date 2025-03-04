import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const MailInput: React.FC<{}> = ({ }) => {
    const { t } = useTranslation();
    return (
        <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Control
                type="email"
                placeholder={t('input-email')}
                required
                className="form-control-lg noto username"
                autoComplete="username"
                aria-label={t('email')}
            />
        </Form.Group>
    );
};