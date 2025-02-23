import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from './topBar/TopBar';
import MarkdownRenderer from './markdown/MarkdownRenderer';
import WindowSizeUtils from './libs/WindowSize';
import { addTask, preload } from '../../Root';
import { Video } from '../../weights/Video';

function App() {
  preload();

  const [isSplit, setIsSplit] = useState(true);
  const [isTran, setIsTran] = useState(false);
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

  }, []);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  addTask({
    runnable: () => {
      setHeight(WindowSizeUtils.getHeight());
      setWidth(WindowSizeUtils.getWidth());
    }
  });

  if (!isSplit) {
    return (
      <Container className="text-center py-5 noto">
        <p>請調整視窗大小，使得視窗寬度接近螢幕寬度的1/2 ({Math.round(window.screen.availWidth / 2)}px) (+-{WindowSizeUtils.tolerance})，以顯示完整內容。</p>
        <p>並請將視窗高度調整至占滿除工作列的螢幕高度 ({window.screen.availHeight}px) (+-{WindowSizeUtils.tolerance})。</p>
        <p>目前高度:{height}，目前寬度:{width}</p>
        <Video second={2} src={'/videos/import_window.mkv'}></Video>
      </Container>
    );
  }

  if (isTran) {
    return (
      <Container className="text-center py-5 noto">
        <p>請關閉Google翻譯，以維持使用體驗。</p>
      </Container>
    );
  }
  addTask({ runnable: () => setIsTran(document.querySelector('html')?.classList.contains('translated-ltr') ? true : false) });

  return (
    <Container fluid className="p-0 position-relative min-vh-100">
      <Top className="fixed-top d-flex flex-column align-items-center top-0 start-0 end-0 shadow-sm bg-body" path={path} title={title} setMarkdownContent={loadMarkdown}></Top>
      <MarkdownRenderer className="p-4 mt-5 markdown-content mkd" markdownContent={markdownContent} path={path} />
    </Container >
  );
}

export default App;
