import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { preload } from '../../Root';

function App() {
    preload();
    const [isLogin, setIsLogin] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const togglePassword = () => setPasswordVisible(!passwordVisible);
    const toggleForm = () => setIsLogin(!isLogin);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = (document.querySelector(".username") as HTMLInputElement).value;
        const password = (document.querySelector(".password") as HTMLInputElement).value;

        const url = isLogin ? "http://ouo.freeserver.tw:24200/login" : "http://ouo.freeserver.tw:24200/register";
        const body = JSON.stringify({ username, password });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body,
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                history.back();
            } else {
                setErrorMessage(`❌ ${isLogin ? "登入" : "註冊"}失敗: ${data.msg}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorMessage("⚠️ 連線錯誤，請稍後再試！");
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

                            {/* 🚀 Bootstrap Alert 顯示錯誤訊息 */}
                            {errorMessage && (
                                <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
                                    {errorMessage}
                                </Alert>
                            )}

                            <Form onSubmit={handleFormSubmit}>
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

                                {isLogin ? (
                                    <Button variant="primary" type="submit" className="w-100 noto">
                                        登入
                                    </Button>
                                ) : (
                                    <>
                                        <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                                            <Form.Control
                                                placeholder="確認密碼"
                                                required
                                                className="form-control-lg noto"
                                                aria-label="確認密碼"
                                            />
                                        </Form.Group>
                                        <Button variant="success" type="submit" className="w-100 noto">
                                            註冊
                                        </Button>
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
