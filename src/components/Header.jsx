import header_logo from "../images/output-onlinepngtools.png";
import UserMenus from "./UserMenus";
import AdminMenus from "./Admin/AdminMenus";
import '../components/Admin/css/admin.css';
export default function Header({fromLayout}) {
  return (
    <header className={ fromLayout === 'user' ? 'bgf_header_wrapper' : 'bgf_admin_header_wrapper'}>
      <div className='content_header'>
        <div className='bgf_logo'>
          <img src={header_logo} alt="logo" />
        </div>
        {console.log(`fromLayout : ${fromLayout}`)}
        {fromLayout === "admin" ? <AdminMenus /> : <UserMenus />}
      </div>
    </header>
  )
}