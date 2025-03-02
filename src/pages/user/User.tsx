import { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { preload } from '../../Root';
import { signInWithGoogle } from './User';
import { FcGoogle } from "react-icons/fc";

function App() {
    preload();
    const [okMessage, setOkMessage] = useState<string | null>(null);

    const googleLogin = async () => {
        await signInWithGoogle();
        setOkMessage("✔️ 登入成功!");
        if (history.length > 0) {
            history.back();
        } else {
            location.href = "/";
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

                            {okMessage && (
                                <Alert variant="success" onClose={() => setOkMessage(null)} dismissible>
                                    {okMessage}
                                </Alert>
                            )}

                            <Button
                                className="noto d-flex align-items-center justify-content-center rounded-3 body-color btn-outline-secondary btn bg-inverse-hover shadow-large w-100 h-100"
                                onClick={googleLogin}
                            >
                                <FcGoogle size={24} className="me-2" />
                                <span className="h6 m-0">使用 Google 帳戶繼續</span>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
