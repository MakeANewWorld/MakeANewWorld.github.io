import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from './topBar/TopBar';
import MarkdownRenderer from './markdown/MarkdownRenderer';
import WindowSizeUtils from './libs/WindowSize';
import { setColorScheme } from '../../Root';

function App() {
  setColorScheme();

  const [isSplit, setIsSplit] = useState(false);
  useEffect(() => {
    WindowSizeUtils.registerEvent(setIsSplit);
    WindowSizeUtils.handleResize();
    return WindowSizeUtils.unregisterEvent;
  }, []);

  const [title, setTitle] = useState<string>('');

  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [path, setPath] = useState<string>('');
  const loadMarkdown = (path: string, reload?: boolean) => {
    if (!reload) {
      setPath(path);
    }
    fetch(path)
      .then((res) => {
        if (!res.ok || !res.headers.get("content-type")?.includes("text/markdown")) {
          throw new Error("Invalid markdown file");
        }
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text.split("\n").slice(1).join("\n"));
        setTitle(text.split('\n')[0].replace('\r', '').replace('#', ''));
      })
      .catch((err) => console.error("Markdown loading error:", err));
  };

  useEffect(() => {
    loadMarkdown('/markdown/learn-idea.md');
    const interval = setInterval(() => {
      if (path) {
        loadMarkdown(path, true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isSplit) {
    return (
      <Container className="text-center py-5">
        <p>請調整視窗大小，使得視窗寬度接近螢幕寬度的1/3 ({Math.round(window.screen.availWidth / 3)}px)，以顯示完整內容。</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0 position-relative min-vh-100">
      <Top className="fixed-top d-flex flex-column align-items-center top-0 start-0 end-0 shadow-sm bg-body" path={path} title={title} setMarkdownContent={loadMarkdown}></Top>
      <MarkdownRenderer className="p-4 mt-5 markdown-content" markdownContent={markdownContent} />
    </Container >
  );
}

export default App;
