import { Form, FormControl, InputGroup } from "react-bootstrap";

export const PasswordInput: React.FC<{ passwordVisible: boolean, isLogin: boolean, togglePassword: () => void }> =
    ({ passwordVisible, isLogin, togglePassword }) => {
        return (
            <Form.Group controlId="formBasicPassword" className="mb-3">
                <InputGroup>
                    <FormControl
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="輸入密碼"
                        required
                        className="form-control-lg noto password"
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                        aria-label="密碼"
                    />
                    <InputGroup.Text className='cur-point noto' onClick={togglePassword}>
                        {passwordVisible ? '隱藏' : '顯示'}
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
        );
    };