import header_logo from "../../images/output-onlinepngtools.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {useAdminAuth} from "../../context/AdminAuthContext";
import {useNavigate} from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function Header() {
  const { admin , setAdmin} = useAdminAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      if (!admin) return;
      await adminApi.post("/logout", {}, {withCredentials:true});
    } catch(error) {
      console.log("Logout API failed, forcing logout anyway");
    }
    localStorage.removeItem("adminAccessToken");
    setAdmin(null);
    navigate("/admin/login", { replace: true });
  }
  return (
    <header className='bgf_admin_header_wrapper'>
      <div className='content_header'>
        <div className='bgf_logo'>
          <img src={header_logo} alt="logo" />
        </div>
        <div className="menus">
          <div className="menu-item">
            <div className="menu-group">
              <div className="icon"><FontAwesomeIcon icon={faCircleUser} /></div><span>Hello , {admin?.userId || ""}</span>
            </div>
          </div>
          <div className="menu-item">
            <div className="menu-group" onClick={() => handleLogout()}>
              <div className="icon-text">Logout</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}