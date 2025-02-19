import { Card, ListGroup } from "react-bootstrap";
import Task from "../libs/Task";
import { None } from "./task/None";

export const Directory: React.FC<{ setMarkdownContent: (path: string) => void } > = ({ setMarkdownContent }) => {
    return (
        <Card className="mb-2">
            <Card.Header className="noto">📂 目錄</Card.Header>
            <ListGroup variant="flush" style={{maxHeight: "20vh", overflowY: "auto"}}>
                {Task.getAllSelectivityTasks(task => task.isUnlocked()).length > 0 ? (
                    Task.getAllSelectivityTasks(task => task.isUnlocked()).map(task => (
                        <ListGroup.Item
                            key={task.getHashCode()}
                            className="d-flex justify-content-between noto hover-re-opt cur-point"
                            onClick={() => setMarkdownContent(task.getPath())}>
                            {task.getTaskName()}
                        </ListGroup.Item>
                    ))
                ) : (<None/>)}
            </ListGroup>
        </Card>
    );
};