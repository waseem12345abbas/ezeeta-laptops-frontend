import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const links=[
    { to: '/admin', label:'Dashboard'},
    { to: '/admin/menu', label: 'Menu'},
    { to: '/admin/users', label: 'Users'},
    { to: '/admin/orders', label: 'Orders'},
    { to: '/admin/new', label: 'New'}
]

const AdminNavbar = () => {
    const location=useLocation();
  return ( 
    <nav className='w-full md:max-w-64 bg-gradient-to-br from-neutral-300 to-neutral-500 flex flex-col items-center md:items-start  gap-4  md:min-h-screen px-4'>
        <h2 className="text-2xl font-bold mb-4 md:mb-8 text-nowrap text-center mt-8 text-black">Admin Panel</h2>
        <ul className="flex md:flex-col space-x-2 items-center md:items-start space-y-0 md:space-y-4 mb-4">
            {
                links.map((link)=>(
                    <li key={link.to} className='md:w-30 bg-neutral-500 text-black rounded-md font-semibold shadow-md shadow-neutral-500'>
                        <Link to={link.to}
                        className={`block px-3 py-2 text-base rounded-md text-center
                            ${location.pathname === link.to ? 'bg-black text-white':'hover:bg-neutral-400'}`}
                        >{link.label}</Link>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default AdminNavbar
