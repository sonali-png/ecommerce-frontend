import UserMenus from "./UserMenus";
import ProductSearchWidget from "./ProductSearchWidget";
import LayoutCss from "../css/newLayoutCopy.module.css"; 

export default function Header({fromLayout}) {
  return (
    <header className={LayoutCss.navbar}>
      <div className={`${LayoutCss.container} ${LayoutCss.navContainer}`}>
          <div className={LayoutCss.logo}>
          <a href="/">BAGIFY</a>
          </div>

          <nav className={LayoutCss.navMenu}>
            <ul>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Footwear</a></li>
                <li><a href="#">Beauty</a></li>
            </ul>
          </nav>

          {/* <ProductSearchWidget /> */}
          <div className={LayoutCss.navActions}>
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