import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GetStart.css';
import { useLayoutEffect } from 'react';

function App() {
  useLayoutEffect(() => {
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.body.setAttribute('data-bs-theme', mode);
    (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
  }, []);

  return (
    <Container fluid className="p-0 position-relative min-vh-100">
    </Container >
  );
}

export default App;
