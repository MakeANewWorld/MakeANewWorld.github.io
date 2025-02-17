import { Card, ListGroup } from "react-bootstrap";
import Task, { User } from "../../libs/Task";
import { None } from "./None";

export const TaskList: React.FC<{ forceUpdate: React.DispatchWithoutAction }> = ({ forceUpdate }) => {
    return (
        <Card className="mb-2">
            <Card.Header className="fw-bold">📋 任務</Card.Header>
            <ListGroup variant="flush">
                {Task.getAllSelectivityTasks(task => !task.isCompleted() && task.isUnlocked()).length > 0 ? (
                    Task.getAllSelectivityTasks(task => !task.isCompleted() && task.isUnlocked()).map(task => (
                        <ListGroup.Item key={task.getHashCode()} onClick={() => task.completeTask(User.DEFAULT_USER, forceUpdate)}
                            className="d-flex justify-content-between cur-point">
                            {task.getTaskName()}
                            <span className="badge bg-primary">{task.getPoints()}分</span>
                        </ListGroup.Item>
                    ))
                ) : (<None />)}
            </ListGroup>
        </Card>
    );
};