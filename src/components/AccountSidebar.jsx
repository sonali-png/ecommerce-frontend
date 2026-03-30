import "../css/account.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";


export default function AccountSidebar() {
  return (
    <div className='bgf-account-sidebar'>
        <div className="menus">
          <div className="menu-link">
            <NavLink to="/profile" >
              Profile
            </NavLink>
          </div>
          <div className="menu-link">
            <NavLink to="/orders">
              My Orders
            </NavLink>
          </div>
          <div className="menu-link">
            <NavLink to="/wishlist">
              Wishlist
            </NavLink>
          </div>
          <div className="menu-link">Logout</div>
        </div>
    </div>  
  )
}
