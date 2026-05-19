import Header from "./Header";
import AccountSidebar from "./AccountSidebar";
import { Outlet } from "react-router-dom";
import useLoginRedirect from "../hooks/useLoginRedirect";

export default function AccountLayout() {
  const handleOpenLogin = useLoginRedirect();
  return (
    <div>
      <Header openLogin={handleOpenLogin} fromLayout="user" />
      <div className='bgf-account-layout-wrapper'>
        <AccountSidebar />
        <Outlet />
      </div>
    </div>
  );
}