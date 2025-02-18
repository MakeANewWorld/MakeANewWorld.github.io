import { useState, useEffect, useLayoutEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from './topBar/TopBar';
import MarkdownRenderer from './markdown/MarkdownRenderer';
import './Play.css';
import WindowSizeUtils from './libs/WindowSize';

function App() {
  useLayoutEffect(() => {
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.body.setAttribute('data-bs-theme', mode);
    (document.querySelector(':root') as HTMLElement).style.colorScheme = mode;
  }, []);

  const [isSplit, setIsSplit] = useState(false);
  useEffect(() => {
    WindowSizeUtils.registerEvent(setIsSplit);
    WindowSizeUtils.handleResize();
    return WindowSizeUtils.unregisterEvent;
  }, []);

  const [markdownContent, setMarkdownContent] = useState<string>('');
  useEffect(() => {
    fetch('/markdown/GetStart.md')
      .then((res) => res.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  const [title, setTitle] = useState<string>('');

  if (!isSplit) {
    return (
      <Container className="text-center py-5">
        <p>請調整視窗大小，使得視窗寬度接近螢幕寬度的1/3 ({Math.round(window.screen.availWidth / 3)}px)，以顯示完整內容。</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0 position-relative min-vh-100">
      <Top className="position-fixed top-0 start-0 end-0 shadow-sm bg-body" title={title}></Top>
      <MarkdownRenderer className="p-4 mt-5 markdown-content" markdownContent={markdownContent} setTitle={setTitle} />
    </Container >
  );
}

export default App;
