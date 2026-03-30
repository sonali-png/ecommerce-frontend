import Header from "./Header";
import AccountSidebar from "./AccountSidebar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div>
      <Header />
      <div className='bgf-account-layout-wrapper'>
        <AccountSidebar />
        <Outlet />
    </div>
    </div>
  );
}