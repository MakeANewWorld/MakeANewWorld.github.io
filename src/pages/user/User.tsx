import { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { preload } from '../../Root';
import { createUserWithEmail, signInWithEmail, signInWithGoogle } from './User';
import { FcGoogle } from "react-icons/fc";
import { FirebaseError } from 'firebase/app';
import { getErrorTranslate } from './ErrorHadler';
import { ConfirmPassword } from './form/ConfirmPassword';
import { MailInput } from './form/MailInput';
import { PasswordInput } from './form/PasswordInput';
import { useTranslation } from 'react-i18next';

function App() {
    preload();
    const { t } = useTranslation();
    const [okMessage, setOkMessage] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const togglePassword = () => setPasswordVisible(!passwordVisible);
    const toggleForm = () => setIsLogin(!isLogin);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const email = (document.querySelector(".username") as HTMLInputElement).value;
        const password = (document.querySelector(".password") as HTMLInputElement).value;

        try {
            if (isLogin) {
                await signInWithEmail(email, password);
                setOkMessage("✔️ " + t("login-success"));
            } else {
                await createUserWithEmail(email, password);
                setOkMessage("✔️ " + t("register-login-success"));
            }
            setErrorMessage(null);
            if (history.length > 0) {
                history.back();
            } else {
                location.href = "/";
            }
        } catch (error: any) {
            setOkMessage(null);

            const action = t(isLogin ? "login" : "register");
            const message = error instanceof FirebaseError ? getErrorTranslate(error) : error.message;
            setErrorMessage(`❌ ${action} ${t("failure")}: ${message}`);
        }
    };

    const googleLogin = async () => await signInWithGoogle();

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm rounded">
                        <h2 className="inter">{t("greeting")}</h2>
                        <Card.Body>
                            <div className="text-center mb-4">
                                <img className='bi' src="crepper.svg" alt="Crepper" width="160" height="128" />
                            </div>

                            {errorMessage && (
                                <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
                                    {errorMessage}
                                </Alert>
                            )}
                            {okMessage && (
                                <Alert variant="success" onClose={() => setOkMessage(null)} dismissible>
                                    {okMessage}
                                </Alert>
                            )}

                            <Button
                                className="noto d-flex mb-3 align-items-center justify-content-center rounded-3 body-color btn-outline-secondary btn bg-inverse-hover shadow-large w-100 h-100"
                                onClick={googleLogin}>
                                <FcGoogle size={24} className="me-2" />
                                <span className="h6 m-0">{t("continue-with-google")}</span>
                            </Button>

                            <Form onSubmit={handleFormSubmit}>
                                <MailInput />
                                <PasswordInput passwordVisible={passwordVisible} isLogin={isLogin} togglePassword={togglePassword} />

                                {isLogin ? (
                                    <Button variant="primary" type="submit" className="w-100 noto">{t('login')}</Button>
                                ) : (
                                    <>
                                        <ConfirmPassword />
                                        <Button variant="success" type="submit" className="w-100 noto">{t('register')}</Button>
                                    </>
                                )}
                            </Form>

                            <div className="text-center mt-3 noto">
                                <span>{isLogin ? t("no-account") : t("have-account")} </span>
                                <span onClick={toggleForm} className='cur-point fw-bold'>{isLogin ? t('register') : t('login')}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
