import { Button, Card, ListGroup } from "react-bootstrap";
import Task, { User } from "../../libs/Task";
import { None } from "./None";
import { useEffect } from "react";

export const TaskList: React.FC<{ forceUpdate: React.DispatchWithoutAction }> = ({ forceUpdate }) => {
    useEffect(() => {
        fetch("/markdown/tasklist.json")
            .then((res) => res.json())
            .then((data) => {
                data.forEach((taskInfo: { points: number; name: string; path: string; unlockPoints: number }) => {
                    try {
                        let find: boolean = false;
                        for (let i = 0; i < Task.getAllTasks().length; i++) {
                            if (Task.getAllTasks()[i].getTaskName() === taskInfo.name) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            new Task(taskInfo.points, taskInfo.name, taskInfo.path, taskInfo.unlockPoints);
                        }
                    } catch (error) {
                        console.error("Task creation failed", error);
                    }
                });
            })
            .catch((err) => console.error("Error loading markdown.json:", err));
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
                            <Button variant="outline-primary ms-3" size="sm"
                                onClick={() => task.completeTask(User.DEFAULT_USER, forceUpdate)}
                                className="noto">
                                ${task.getPoints()}
                            </Button>
                        </ListGroup.Item>
                    ))
                ) : (<None />)}
            </ListGroup>
        </Card>
    );
};