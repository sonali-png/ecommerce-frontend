    import React, {useState} from 'react'
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { faCircleUser, faHeart, faAngleDown } from "@fortawesome/free-solid-svg-icons";
    import {useAuth} from "../context/AuthContext";
    import {useNavigate, useLocation} from "react-router-dom";
    import userApi from "../api/userApi";
    import { useDispatch } from "react-redux";
    import { setWishlist } from "../redux/wishlistSlice";
    import useLoginRedirect from "../hooks/useLoginRedirect";

    export default function UserMenus() {
        const handleOpenLogin = useLoginRedirect();
        const { user, setUser } = useAuth();
        const [showMenu, setShowMenu] = useState(false);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const location = useLocation();

        const showOptions = () => {
            setShowMenu(prev => !prev);
        }

        const handleLogout = async () => {
            try {
                if (!user) return;
                await userApi.post("/logout", {}, {withCredentials:true});
            } catch(error) {
                console.log("Logout API failed, forcing logout anyway");
            }
            localStorage.removeItem("userAccessToken");
            localStorage.removeItem("wishlist");
            dispatch(setWishlist([]));
            setUser(null);
            setShowMenu(false);
            console.log(`User : ${user}`);
            if (location.pathname === '/login') { navigate("/login"); return; }
            navigate("/", { replace: true });
        }

        return (
            <div className="menus">
                <div className="menu-item">
                    <div className="menu-group">
                        <div className="icon"><FontAwesomeIcon icon={faCircleUser} /></div>
                            { !(user) ? <div className="icon-text" onClick={handleOpenLogin}>Login</div> : 
                                <div>
                                    <div className="user-data">
                                        <h3>{user.userId}</h3> 
                                        <FontAwesomeIcon 
                                            icon={faAngleDown}
                                            onClick={showOptions}
                                            className={`arrow-icon ${showMenu ? "rotateup" : ""}`}
                                        />
                                        <div className={`dropdown ${showMenu ? "active" : ""}`}>
                                            <p onClick={()=>navigate("/account")}>Profile</p>
                                            <p onClick={()=>navigate("/orders")}>Orders</p>
                                            <p onClick={(e) => { e.stopPropagation(); handleLogout(); }}>Logout</p>
                                        </div>
                                    </div>
                                </div>        
                            }  
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-group" onClick={() => navigate("/wishlist")}>
                        <div className="icon"><FontAwesomeIcon icon={faHeart} /></div>
                        <div className="icon-text">Wishlist</div>
                    </div>
                </div>
            </div>
        )
    }
