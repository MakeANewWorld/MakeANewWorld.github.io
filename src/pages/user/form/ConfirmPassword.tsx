import { Form } from "react-bootstrap";

export const ConfirmPassword: React.FC<{}> = ({ }) => {
    return (
        <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
            <Form.Control
                placeholder="確認密碼"
                required
                className="form-control-lg noto"
                aria-label="確認密碼"
            />
        </Form.Group>
    );
};