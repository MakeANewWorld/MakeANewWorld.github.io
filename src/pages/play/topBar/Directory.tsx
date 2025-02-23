import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import Task from "../libs/Task";
import { None } from "./task/None";
import { getItem, setItem } from "../../../Root";

export const Directory: React.FC<{ setMarkdownContent: (path: string) => void, path: string }> = ({ setMarkdownContent, path }) => {
    useEffect(() => {
        const a = async () => {
            const lastViewed = await getItem("lastViewedMarkdown");
            if (lastViewed) {
                setMarkdownContent(lastViewed);
            }
        };
        a();
    }, [setMarkdownContent]);

    const a = async () => {
        if (await getItem("lastViewedMarkdown") === null) {
            await setItem("lastViewedMarkdown", path);
        }
    };
    a();

    return (
        <Card className="mb-2">
            <Card.Header className="noto">📂 目錄</Card.Header>
            <ListGroup variant="flush" style={{ maxHeight: "20vh", overflowY: "auto" }}>
                {Task.getAllSelectivityTasks(task => task.isUnlocked()).length > 0 ? (
                    Task.getAllSelectivityTasks(task => task.isUnlocked()).map(task => (
                        <ListGroup.Item
                            key={task.getHashCode()}
                            className="d-flex justify-content-between noto hover-re-opt cur-point"
                            onClick={() => {
                                const path = task.getPath();
                                setMarkdownContent(path);
                                const a = async () => await setItem("lastViewedMarkdown", path);
                                a();
                            }}>
                            {task.getTaskName()}
                        </ListGroup.Item>
                    ))
                ) : (
                    <None />
                )}
            </ListGroup>
        </Card>
    );
};
