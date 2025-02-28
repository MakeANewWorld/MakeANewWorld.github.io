import { Form } from "react-bootstrap";

export const MailInput: React.FC<{}> = ({ }) => {
    return (
        <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Control
                type="email"
                placeholder="輸入電子郵件"
                required
                className="form-control-lg noto username"
                autoComplete="username"
                aria-label="電子郵件"
            />
        </Form.Group>
    );
};