import React from 'react'
import Header from '../Header';
import { Outlet } from "react-router-dom";
import AdminSidebar from './AdminSidebar';
import Footer from '../Footer';
export default function AdminLayout() {
  return (
    <div>
        <Header fromLayout="admin"/>
        <div className='bgf-admin-container'>
          <AdminSidebar />
          <Outlet />
          
        </div>
        <Footer />
    </div>
  )
}
