import { Outlet } from "react-router-dom";

export default function layout() {
    return (
        <>
            <h2>layout</h2>
            <Outlet />
        </>
    );
}