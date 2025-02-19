import { Card, ListGroup, Button } from "react-bootstrap";
import Task, { User } from "../../libs/Task";
import { None } from "./None";

export const TaskShop: React.FC<{ forceUpdate: React.DispatchWithoutAction }> = ({ forceUpdate }) => {
    return (
        <Card>
            <Card.Header className="noto">🛒 任務商店</Card.Header>
            <ListGroup variant="flush">
                {Task.getAllSelectivityTasks(task => !task.isUnlocked()).length > 0 ? (
                    Task.getAllSelectivityTasks(task => !task.isUnlocked()).map(task => (
                        <ListGroup.Item key={task.getHashCode()} className="d-flex justify-content-between align-items-center noto">
                            {task.getTaskName()}
                            <Button variant="outline-success" size="sm" disabled={!task.canUnlock(User.DEFAULT_USER)}
                                onClick={() => task.unlockTask(User.DEFAULT_USER, forceUpdate)}
                                className="noto">
                                解鎖 (${task.getUnlockPoints()})
                            </Button>
                        </ListGroup.Item>
                    ))
                ) : (<None />)}
            </ListGroup>
        </Card>
    );
};