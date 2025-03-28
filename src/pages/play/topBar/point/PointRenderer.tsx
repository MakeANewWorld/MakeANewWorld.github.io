import { useState } from "react";
import { User } from "@/libs/Task";
import useAsyncEffect from "use-async-effect";

export const PointRenderer: React.FC<{}> = ({ }) => {
    const [points, setPoints] = useState<number>(0);

    useAsyncEffect(async () => {
        await User.loadUserFromServer();
        User.DEFAULT_USER.setHook(setPoints);
        setPoints(User.DEFAULT_USER.getPoints());
    }, []);

    return (
        <div className="position-fixed top-0 end-0 m-3 shadow-sm dark:shadow-[0_1px_3px_0px_rgba(255,255,255,0.1)] rounded px-2 py-1 d-flex align-items-center">
            <h5 className="fw-bold m-0">$ {points}</h5>
        </div>
    );
}