import { Form, FormControl, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const PasswordInput: React.FC<{ passwordVisible: boolean, isLogin: boolean, togglePassword: () => void }> =
    ({ passwordVisible, isLogin, togglePassword }) => {
        const { t } = useTranslation();
        return (
            <Form.Group controlId="formBasicPassword" className="mb-3">
                <InputGroup>
                    <FormControl
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder={t('input-password')}
                        required
                        className="form-control-lg noto password"
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                        aria-label={t('password')}
                    />
                    <InputGroup.Text className='cur-point noto' onClick={togglePassword}>
                        {passwordVisible ? t('hidden-password') : t('show-password')}
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
        );
    };