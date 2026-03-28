import React, {useState, useContext} from "react";
import header_logo from "../images/output-onlinepngtools.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {AuthContext, useAuth} from "../context/AuthContext";
import api from "../api/api";

export default function Header({ openLogin }) {
  const { user } = useAuth();
  const { setUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const showOptions = () => {
    setShowMenu(prev => !prev);
  }
  const handleLogout = async () => {
    try {
      if (!user) return;
      await api.post("/logout", {}, {withCredentials:true});
      localStorage.removeItem("accessToken");
      setUser(null);
      setUser(null);
       setShowMenu(false);
    } catch(error) {
      console.log(error);
    }

  }
  return (
    <header className='bgf_header_wrapper'>
      <div className='content_header'>
        <div className='bgf_logo'>
          <img src={header_logo} alt="logo" />
        </div>

        <div className="menus">
          <div className="menu-item">
            <div className="menu-group">
              <div className="icon"><FontAwesomeIcon icon={faCircleUser} /></div>
              <div>
                {user ? 
                  <div className="user-data">
                    <h3>{user.username}</h3> 
                    <FontAwesomeIcon 
                      icon={faAngleDown}
                      onClick={showOptions}
                      className={`arrow-icon ${showMenu ? "rotateup" : ""}`}
                    />
                    <div className={`dropdown ${showMenu ? "active" : ""}`}>
                      <p onClick={()=>navigate("/profile")}>Profile</p>
                      <p onClick={()=>navigate("/orders")}>Orders</p>
                      <p onClick={handleLogout}>Logout</p>
                    </div>
                  </div> : 
                  <div className="icon-text" onClick={openLogin}>Login</div>}
              </div>
              
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-group" onClick={() => navigate("/wishlist")}>
              <div className="icon"><FontAwesomeIcon icon={faHeart} /></div>
              <div className="icon-text">Wishlist</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}