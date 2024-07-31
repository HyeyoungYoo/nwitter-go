import { Navigate } from "react-router-dom";
import { auth } from "../routes/firebase";

export default function ProtectedRoute({children,}:{children:React.ReactNode;})
{
    const user = auth.currentUser;  //user 또는 null을 받는다.
    if(user==null){
        return <Navigate to ="/login" />
    }
    return children
}