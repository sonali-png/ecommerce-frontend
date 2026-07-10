import header_logo from "../images/output-onlinepngtools.png";
import UserMenus from "./UserMenus";
import ProductSearchWidget from "./ProductSearchWidget";
export default function Header({fromLayout}) {
  return (
    <header class="navbar">
      <div class="container nav-container">
          <div class="logo">
          <a href="/">BAGIFY</a>
          </div>

          <nav class="nav-menu">
          <ul>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Footwear</a></li>
              <li><a href="#">Beauty</a></li>
          </ul>
          </nav>

          <ProductSearchWidget />
          <div class="nav-actions">
            <a href="#">♡</a>
            <a href="#">🛒</a>
            <a href="#">👤</a>
          </div>
      </div>
    </header>
    // <header className={ fromLayout === 'user' ? 'bgf_header_wrapper' : 'bgf_admin_header_wrapper'}>
    //   <div className='content_header'>
    //     <div className='bgf_logo'>
    //       <img src={header_logo} alt="logo" />
    //     </div>
    //     {console.log(`fromLayout : ${fromLayout}`)}
    //     {fromLayout === "admin" ? <AdminMenus /> : <UserMenus />}
    //   </div>
    // </header>
  )
}