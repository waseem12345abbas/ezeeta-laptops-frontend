import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../admin/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className='flex flex-col md:flex-row md:min-h-screen bg-gradient-to-br from-neutral-300 to-neutral-500'>
      <AdminNavbar/>
      <main className='flex-grow'>
        <Outlet/>
      </main>
    </div>
  )
}
export default AdminLayout
