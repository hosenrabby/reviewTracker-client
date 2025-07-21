import React, { use, useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { Link, NavLink, useLocation, useNavigate, } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
    const { user, signout } = use(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlSignout = () => {
        navigate('/login')
        signout()
    }
    // console.log(user)
    const links = <>
        <li className={`text-gray-500 hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-base-content border border-[#211C2A] rounded-full px-4 py-2' : ''}>
                Home
            </NavLink>
        </li>
        <li className={`text-gray-500 hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/services'} className={({ isActive }) => isActive ? 'text-base-content border border-[#211C2A] rounded-full px-3 py-2' : ''}>
                Services
            </NavLink>
        </li>
        <li className={`text-gray-500 hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/add-service'} className={({ isActive }) => isActive ? 'text-base-content border border-[#211C2A] rounded-full px-3 py-2' : ''}>
                Add Services
            </NavLink>
        </li>
        <li className={`text-gray-500 hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/my-services'} className={({ isActive }) => isActive ? 'text-base-content border border-[#211C2A] rounded-full px-3 py-2' : ''}>
                My Services
            </NavLink>
        </li>
        <li className={`text-gray-500 hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/my-reviews'} className={({ isActive }) => isActive ? 'text-base-content border border-[#211C2A] rounded-full px-3 py-2' : ''}>
                My Reviews
            </NavLink>
        </li>
    </>

    return (
        <>
            <div className={`sticky top-0 z-1000 transition-colors duration-300
            ${isScrolled ? 'bg-white shadow-md' : location.pathname == '/' ? 'bg-base-content/0' : 'bg-white'}`}>
                <div className="navbar md:w-10/12 mx-auto px-4 py-6">
                    <div className="navbar-start w-4/12 ">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-base-content">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <div>
                            <Link className='flex items-center gap-2' to={'/'}>
                                <img className='w-12 rounded-2xl' src="/assets/reviewLogo.png" alt="" />
                                <p className='noto-sans font-semibold text-3xl text-base-content hidden md:inline'>review<span className='font-bold'>Tracker</span></p>
                            </Link>
                        </div>
                    </div>

                    <div className="navbar-end space-x-4 w-8/12">
                        <div className="navbar-start hidden lg:flex border-r-1 border-gray-700">
                            <ul className="menu-horizontal space-x-4">
                                {links}
                            </ul>
                        </div>

                        {
                            !user
                                ? <div className='flex justify-between items-center gap-3'>
                                    <div className='border-r-1 border-gray-700'>
                                        <Link to={'/login'}>
                                            <button className={`text-gray-500 hover:text-gray-800 hover:scale-105 transition  pr-4 flex items-center gap-2 cursor-pointer`}><CiUser /> Login</button>
                                        </Link>
                                    </div>
                                    <div className='space-x-2'>
                                        <Link to={'/sign-up'}>
                                            <button className={`py-2 px-4 transition rounded-full font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                                                SignUp
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                : <div className='flex justify-between items-center gap-3'>
                                    <div className='space-x-2'>
                                        <button onClick={handlSignout} className={`py-2 px-4 transition rounded-full font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                                            Log Out
                                        </button>
                                    </div>
                                    <div className="dropdown dropdown-end">
                                        <div className="avatar avatar-online">
                                            <div className="w-10 rounded-full">
                                                <img alt='user' src={user.photoURL} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                        {/* <p>{user&& user.name}</p> */}

                    </div>
                </div>
                {
                    isScrolled || <div className='w-full faded-divider'></div>
                }
            </div>
        </>

    );
};

export default Navbar;