import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Container, Button, ListGroup, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactMarkdown from 'react-markdown';
import WindowSizeUtils from './windowSize'; // 確保你有這個工具

function App() {
  useLayoutEffect(() => {
    document.body.setAttribute(
      'data-bs-theme',
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
  }, []);

  const [tasks, setTasks] = useState([
    { id: 1, text: '完成第一個任務', points: 10, completed: false },
    { id: 2, text: '閱讀一篇技術文章', points: 15, completed: false },
    { id: 3, text: '寫一段 JavaScript 程式碼', points: 20, completed: false }
  ]);
  const [points, setPoints] = useState(0);
  const [shopTasks, setShopTasks] = useState([
    { id: 4, text: '高級任務：解決算法題', points: 30, unlocked: false },
    { id: 5, text: '超高級任務：開發一個小專案', points: 50, unlocked: false }
  ]);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const completeTask = (taskId: number) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
    const task = tasks.find(t => t.id === taskId);
    if (task) setPoints(points + task.points);
  };

  const unlockTask = (taskId: number) => {
    const task = shopTasks.find(t => t.id === taskId);
    if (task && points >= task.points) {
      setPoints(points - task.points);
      setShopTasks(shopTasks.map(t => t.id === taskId ? { ...t, unlocked: true } : t));
      setTasks([...tasks, { ...task, completed: false }]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);


  const [isSplit, setIsSplit] = useState(false);
  useEffect(() => {
    WindowSizeUtils.registerEvent(setIsSplit);
    WindowSizeUtils.handleResize();
    return WindowSizeUtils.unregisterEvent;
  }, []);

  if (!isSplit) {
    return (
      <Container className="text-center py-5">
        <p>請調整視窗大小，使得視窗寬度接近螢幕寬度的一半 ({Math.round(window.screen.availWidth / 2)}px)，以顯示完整內容。</p>
      </Container>
    );
  }
  
  return (
    <Container fluid className="p-0 position-relative" style={{ minHeight: '100vh' }}>
      
      {/* 📋 任務按鈕（左上角） */}
      <Button 
        className="position-fixed top-0 start-0 m-3" 
        variant="light"
        style={{ zIndex: 1050 }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        📋
      </Button>

      {/* 💎 積分（右上角） */}
      <div className="position-fixed top-0 end-0 m-3">
        <h4 className="fw-bold">💎 {points}</h4>
      </div>

      {/* 📜 任務 & 商店選單 */}
      <div 
        ref={menuRef} 
        className="position-fixed top-0 start-0 mt-5 ms-3 p-3 bg-light rounded shadow-sm"
        style={{ width: '250px', zIndex: 1040, display: menuOpen ? 'block' : 'none' }}
      >
        <Card className="mb-2">
          <Card.Header className="fw-bold">📋 任務</Card.Header>
          <ListGroup variant="flush">
            {tasks.map(task => (
              <ListGroup.Item 
                key={task.id} 
                onClick={() => !task.completed && completeTask(task.id)}
                className={`d-flex justify-content-between ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
                style={{ cursor: task.completed ? 'default' : 'pointer' }}
              >
                {task.text} <span className="badge bg-primary">{task.points}分</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>

        <Card>
          <Card.Header className="fw-bold">🛒 任務商店</Card.Header>
          <ListGroup variant="flush">
            {shopTasks.map(task => (
              <ListGroup.Item key={task.id} className="d-flex justify-content-between">
                {task.unlocked ? <span className="text-success">{task.text} ✅</span> : task.text}
                {task.unlocked ? null : (
                  <Button 
                    variant="outline-success" 
                    size="sm" 
                    disabled={points < task.points} 
                    onClick={() => unlockTask(task.id)}
                  >
                    解鎖 ({task.points}分)
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </div>

      {/* 📖 Markdown 顯示器 */}
      <Container className="p-4">
        <h4 className="fw-bold text-center">📖 Markdown 顯示器</h4>
        <Card className="shadow-sm p-3">
          <ReactMarkdown>
            {`# 你好！
這是一個 **Markdown 測試**
- 🎉 支援標題、粗體、列表等
- 可以使用 \`ReactMarkdown\` 來解析
- 之後可以加上 **編輯功能**`}
          </ReactMarkdown>
        </Card>
      </Container>
    </Container>
  );
}

export default App;
