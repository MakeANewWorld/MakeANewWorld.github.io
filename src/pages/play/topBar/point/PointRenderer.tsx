import { useEffect, useState } from "react";
import { User } from "../../../../libs/Task";

export default function PointRenderer() {
    const [points, setPoints] = useState<number>(0);

    useEffect(() => {
        async function loadUser() {
            await User.loadUserFromLocalStorage();
            User.DEFAULT_USER.setHook(setPoints);
            setPoints(User.DEFAULT_USER.getPoints());
        }
        loadUser();
    }, []);

    return (
        <div className="position-fixed top-0 end-0 m-3 shadow-sm rounded px-2 py-1 d-flex align-items-center bg-inverse">
            <h5 className="fw-bold m-0">$ {points}</h5>
        </div>
    );
}