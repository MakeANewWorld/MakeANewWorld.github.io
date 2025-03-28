import { useState, useEffect, useCallback } from 'react';
import { Top } from './topBar/TopBar';
import { MarkdownRenderer } from './markdown/MarkdownRenderer';
import WindowSizeUtils from '@/libs/WindowSize';
import { setAll } from '@/Root';
import { Video } from '@/weights/Video';
import { useTranslation } from 'react-i18next';
import { DEFAULT_VALUES, ItemType, MANAGER, markdowns, setMarkdowns } from '../user/ItemHandler';
import { Loading } from '@/Loading';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import useAsyncEffect from 'use-async-effect';
import { checkAndGetUser } from '../user/User';
import Task from '@/libs/Task';

export const Play: React.FC = () => {
  setAll();

  const [isLoading, setIsLoading] = useState(true);

  const [isSplit, setIsSplit] = useState(true);

  useEffect(() => {
    WindowSizeUtils.registerEvent(setIsSplit);
    WindowSizeUtils.handleResize();
    return WindowSizeUtils.unregisterEvent;
  }, []);

  const [title, setTitle] = useState<string>('');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [path, setPath] = useState<string>('/markdown/learn-idea.md');

  const loadMarkdown = useCallback((path: string) => {
    const content = markdowns[path];
    setPath(path);
    setMarkdownContent(content.split("\n").slice(1).join("\n"));
    setTitle(content.split('\n')[0].replace(/[\r#]+/g, ''));
  }, []);

  useAsyncEffect(async isMounted => {
    DEFAULT_VALUES[ItemType.LAST_VIEWED_MARKDOWN] = path;
    await MANAGER.fetchOfTypes(checkAndGetUser(), [ItemType.LAST_VIEWED_MARKDOWN, ItemType.TASKS, ItemType.USER_POINTS, ItemType.LAST_SCROLL_INDEX]);
    await Task.loadTasksFromServer();
    await fetch("/markdown/tasklist.json")
      .then((res) => res.json())
      .then((data) => {
        const existingTasks = new Set(Task.getAllTasks().map(task => task.getTaskName()));
        data.forEach((taskInfo: { name: string; points: number; path: string; unlockPoints: number; }) => {
          if (!existingTasks.has(taskInfo.name)) {
            new Task(taskInfo.points, taskInfo.name, taskInfo.path, taskInfo.unlockPoints);
          }
        });
      });

    const tasks = Task.getAllTasks();
    const entries = await Promise.all(
      tasks.map(async task => {
        const path = task.getPath();
        const content = await fetch(path).then(res => res.text());
        return [path, content] as const;
      })
    );
    setMarkdowns(Object.fromEntries(entries));

    setIsLoading(false);
  }, []);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    setHeight(WindowSizeUtils.getHeight());
    setWidth(WindowSizeUtils.getWidth());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    screen.orientation.addEventListener('change', handleResize);
  }, []);

  const { t } = useTranslation();

  if (!isSplit) {
    return (
      <div className="container mx-auto text-center py-5">
        <p>{t("adjust-window-size")} ({Math.round(window.screen.availWidth / 2)}px) (+-{WindowSizeUtils.tolerance})</p>
        <p>{t("adjust-window-height")} ({window.screen.availHeight}px) (+-{WindowSizeUtils.tolerance})</p>
        <p>{t("current-height")}:{height} {t("current-width")}:{width}</p>
        <Video second={2} src={'/videos/import_window.mkv'}></Video>
      </div>
    );
  }

  if (isLoading) {
    return <ThemeProvider storageKey="vite-ui-theme">
      <Loading isLoading={isLoading} theme={useTheme().theme} />
    </ThemeProvider>;
  }

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="w-full p-0 relative min-h-screen">
        <Top
          className="fixed top-0 left-0 right-0 flex flex-col items-center shadow-sm bg-white dark:bg-[#121212]"
          path={path}
          title={title}
          setMarkdownContent={loadMarkdown}
        />
        <MarkdownRenderer className="p-4 mt-5 markdown-content mkd" markdownContent={markdownContent} />
      </div>
    </ThemeProvider>
  );
};