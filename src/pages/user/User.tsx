import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { preload } from '../../Root';
import { createUserWithEmail, signInWithEmail } from './User';
import React from 'react';
import { PasswordInput } from './form/PasswordInput';
import { MailInput } from './form/MailInput';
import { ConfirmPassword } from './form/ConfirmPassword';

function App() {
    preload();
    const [isLogin, setIsLogin] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [okMessage, setOkMessage] = useState<string | null>(null);

    const togglePassword = () => setPasswordVisible(!passwordVisible);
    const toggleForm = () => setIsLogin(!isLogin);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const email = (document.querySelector(".username") as HTMLInputElement).value;
        const password = (document.querySelector(".password") as HTMLInputElement).value;

        try {
            if (isLogin) {
                await signInWithEmail(email, password);
                setOkMessage("✔️ 登入成功!");
            } else {
                await createUserWithEmail(email, password);
                setOkMessage("✔️ 註冊且登入成功!");
            }
            setErrorMessage(null);
            if (history.length > 0) {
                history.back();
            } else {
                location.href = "/";
            }
        } catch (error: any) {
            setOkMessage(null);
            setErrorMessage(`❌ ${isLogin ? "登入" : "註冊"}失敗: ${error.message}`);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="p-4 shadow-sm rounded">
                        <h2 className="inter">Welcome</h2>
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

                            <Form onSubmit={handleFormSubmit}>
                                <MailInput/>
                                <PasswordInput passwordVisible={passwordVisible} isLogin={isLogin} togglePassword={togglePassword}/>

                                {isLogin ? (
                                    <Button variant="primary" type="submit" className="w-100 noto">登入</Button>
                                ) : (
                                    <>
                                        <ConfirmPassword/>
                                        <Button variant="success" type="submit" className="w-100 noto">註冊</Button>
                                    </>
                                )}
                            </Form>

                            <div className="text-center mt-3 noto">
                                <span>{isLogin ? '還沒有帳號? ' : '已經有帳號? '}</span>
                                <span onClick={toggleForm} className='cur-point fw-bold'>{isLogin ? '註冊' : '登入'}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
