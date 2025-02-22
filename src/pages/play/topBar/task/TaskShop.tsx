import { Card, ListGroup, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
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
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    !task.canUnlock(User.DEFAULT_USER) ? (
                                        <Tooltip id={`tooltip-${task.getHashCode()}`} style={{ zIndex: 2000 }}>
                                            餘額不足
                                        </Tooltip>
                                    ) : <></>
                                }>
                                <span>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => task.unlockTask(User.DEFAULT_USER, forceUpdate)}
                                        className="noto ms-3"
                                        disabled={!task.canUnlock(User.DEFAULT_USER)}>
                                        解鎖 (${task.getUnlockPoints()})
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