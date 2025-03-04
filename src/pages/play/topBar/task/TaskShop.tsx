import { Card, ListGroup, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Task, { User } from "../../../../libs/Task";
import { None } from "./None";
import { useTranslation } from "react-i18next";

export const TaskShop: React.FC<{ forceUpdate: React.DispatchWithoutAction }> = ({ forceUpdate }) => {
    const { t } = useTranslation();
    return (
        <Card>
            <Card.Header className="noto">🛒 {t("task-store")}</Card.Header>
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
                                            {t("insufficient-balance")}
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
                                        {t("unlock")} (${task.getUnlockPoints()})
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