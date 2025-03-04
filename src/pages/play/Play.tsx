import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from './topBar/TopBar';
import MarkdownRenderer from './markdown/MarkdownRenderer';
import WindowSizeUtils from '../../libs/WindowSize';
import { preload } from '../../Root';
import { Video } from '../../weights/Video';
import { useTranslation } from 'react-i18next';

function App() {
  preload();

  const [isSplit, setIsSplit] = useState(true);
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

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    setHeight(WindowSizeUtils.getHeight());
    setWidth(WindowSizeUtils.getWidth());
  };

  useEffect(() => {
    loadMarkdown('/markdown/learn-idea.md');
    window.addEventListener('resize', handleResize);
    screen.orientation.addEventListener('change', handleResize);
  }, []);

  const { t } = useTranslation();

  if (!isSplit) {
    return (
      <Container className="text-center py-5 noto">
        <p>{t("adjust-window-size")} ({Math.round(window.screen.availWidth / 2)}px) (+-{WindowSizeUtils.tolerance})</p>
        <p>{t("adjust-window-height")} ({window.screen.availHeight}px) (+-{WindowSizeUtils.tolerance})</p>
        <p>{t("current-height")}:{height} {t("current-width")}:{width}</p>
        <Video second={2} src={'/videos/import_window.mkv'}></Video>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0 position-relative min-vh-100">
      <Top className="fixed-top d-flex flex-column align-items-center top-0 start-0 end-0 shadow-sm bg-body" path={path} title={title} setMarkdownContent={loadMarkdown}></Top>
      <MarkdownRenderer className="p-4 mt-5 markdown-content mkd" markdownContent={markdownContent} path={path} />
    </Container >
  );
}

export default App;
