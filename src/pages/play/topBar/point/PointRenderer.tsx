import { TbCoin } from "react-icons/tb";
import { User } from "../../libs/Task";

export default function PointRenderer() {
    return (
        <div className="position-fixed top-0 end-0 m-3 border border-secondary shadow-sm rounded px-2 py-1 d-flex align-items-center">
                <TbCoin size='1.3rem' className="me-2" />
            <h5 className="fw-bold m-0">{User.DEFAULT_USER.getPoints()}</h5>
        </div>
    )
}