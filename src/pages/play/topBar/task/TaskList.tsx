import { Button, Card, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import Task, { User } from "../../libs/Task";
import { None } from "./None";
import { useEffect, useState } from "react";

export const TaskList: React.FC<{ forceUpdate: React.DispatchWithoutAction, path: string }> = ({ forceUpdate, path }) => {
    useEffect(() => {
        User.loadUserFromLocalStorage();
        if (localStorage.getItem('tasks')) {
            Task.loadTasksFromLocalStorage();
        }
        fetch("/markdown/tasklist.json")
            .then((res) => res.json())
            .then((data) => {
                const existingTasks = new Set(Task.getAllTasks().map(task => task.getTaskName()));
                data.forEach((taskInfo: { points: number; name: string; path: string; unlockPoints: number }) => {
                    if (!existingTasks.has(taskInfo.name)) {
                        new Task(taskInfo.points, taskInfo.name, taskInfo.path, taskInfo.unlockPoints);
                    }
                });
            })
            .catch((err) => console.error("Error loading markdown.json:", err));
    }, []);

    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= pageHeight - 10) {
                setIsBottom(true);
            } else {
                setIsBottom(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <Card className="mb-2">
            <Card.Header className="noto">📋 任務</Card.Header>
            <ListGroup variant="flush">
                {Task.getAllSelectivityTasks(task => !task.isCompleted() && task.isUnlocked()).length > 0 ? (
                    Task.getAllSelectivityTasks(task => !task.isCompleted() && task.isUnlocked()).map(task => (
                        <ListGroup.Item key={task.getHashCode()}
                            className="d-flex justify-content-between cur-point noto align-items-center">
                            {task.getTaskName()}
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    task.getPath() !== path ? (
                                        <Tooltip id={`tooltip-${task.getHashCode()}`} style={{ zIndex: 2000 }}>
                                            目前不在此任務的頁面
                                        </Tooltip>
                                    ) :
                                        !isBottom ?
                                            (
                                                <Tooltip id={`tooltip-${task.getHashCode()}`} style={{ zIndex: 2000 }}>
                                                    目前尚未閱讀完成(於頁面最底部)
                                                </Tooltip>
                                            )
                                            : <></>
                                }>
                                <span>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => task.completeTask(User.DEFAULT_USER, forceUpdate)}
                                        className="noto ms-3"
                                        disabled={task.getPath() !== path || !isBottom}>
                                        領取 ${task.getPoints()}
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        </ListGroup.Item>
                    ))
                ) : (<None />)}
            </ListGroup>
        </Card>
    );
};