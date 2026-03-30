import React, {useState, useContext} from "react";
import header_logo from "../images/output-onlinepngtools.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {AuthContext, useAuth} from "../context/AuthContext";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { setWishlist } from "../redux/wishlistSlice";

export default function Header({ openLogin }) {
  const { user } = useAuth();
  const { setUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showOptions = () => {
    setShowMenu(prev => !prev);
  }

  const handleLogout = async () => {
    try {
      if (!user) return;
      await api.post("/logout", {}, {withCredentials:true});
    } catch(error) {
      console.log("Logout API failed, forcing logout anyway");
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("wishlist");
    dispatch(setWishlist([]));
    setUser(null);
    setShowMenu(false);
    navigate("/", { replace: true });
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
                      <p onClick={(e) => { e.stopPropagation(); handleLogout(); }}>Logout</p>
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