import { ListGroup } from "react-bootstrap";

export const None: React.FC<{}> = ({ }) => {
    return (
        <ListGroup.Item className="text-center text-muted noto">
            這裡沒有東西了，去別的地方看看吧~
        </ListGroup.Item>
    );
};