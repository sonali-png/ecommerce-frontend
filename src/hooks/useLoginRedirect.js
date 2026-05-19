import { useNavigate, useLocation } from "react-router-dom";

export default function useLoginRedirect() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleOpenLogin = () => {
        if(location.pathname === '/login') return;
        navigate('/login');
    }
    return handleOpenLogin;
}