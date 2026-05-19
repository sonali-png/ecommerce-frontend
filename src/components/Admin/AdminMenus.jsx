import adminApi from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from "../../context/AdminAuthContext.js";

export default function AdminMenus() {
    const navigate = useNavigate();
    const {setAdmin, admin} = useAdminAuth();
    const handleLogout = async () => {
        
      try {
          if (!admin) return;
          await adminApi.post("/logout", {}, {withCredentials:true});
      } catch(error) {
          console.log("Logout API failed, forcing logout anyway");
      }
      localStorage.removeItem("adminAccessToken");
      setAdmin(null);
      navigate("/admin/login");
    }
    return (
    <div className="menus">
        <div className="menu-item">
                <div className="menu-group">
                    { admin ? <h3>{admin.userId}</h3>  : ""}
                </div>
            </div>
            { 
            admin && 
            <div className="menu-item">
                <div className="menu-group" onClick={() => handleLogout()}>
                    <div className="icon-text">Logout</div>
                </div>
            </div>
            }
    </div>
  )
}
