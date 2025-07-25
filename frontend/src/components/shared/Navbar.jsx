import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className='bg-white dark:bg-gray-900 border-b shadow-sm sticky top-0 z-50'>
      <div className='flex items-center justify-between mx-auto max-w-6xl h-16 px-4 py-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
            Work<span className='text-blue-500'>sy</span>
          </h1>
        </div>

        {/* Desktop menu */}
        <div className='hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200'>
          {
            user && user.role === 'recruiter' ? (
              <>
                <Link to="/admin/companies" className="hover:text-[#6A38C2]">Companies</Link>
                <Link to="/admin/jobs" className="hover:text-[#6A38C2]">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-[#6A38C2]">Home</Link>
                <Link to="/jobs" className="hover:text-[#6A38C2]">Jobs</Link>
                <Link to="/browse" className="hover:text-[#6A38C2]">Browse</Link>
              </>
            )
          }
          {!user ? (
            <>
              <Link to="/login"><Button variant='outline' size="sm">Login</Button></Link>
              <Link to="/signup"><Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">Signup</Button></Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 dark:bg-gray-800 dark:text-white">
                <div className='flex gap-2'>
                  <Avatar><AvatarImage src={user?.profile?.profilePhoto} /></Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600 dark:text-gray-300'>
                  {user?.role === 'student' && (
                    <div className='flex items-center gap-2'>
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className='flex items-center gap-2'>
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile toggle icon */}
        <div className="md:hidden">
          {isMenuOpen ? (
            <FaTimes className="text-2xl text-gray-700 dark:text-white" onClick={() => setIsMenuOpen(false)} />
          ) : (
            <FaBars className="text-2xl text-gray-700 dark:text-white" onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t py-4 px-6 space-y-4">
          {
            user && user.role === 'recruiter' ? (
              <>
                <Link to="/admin/companies" onClick={closeMenu} className="block text-gray-700 dark:text-gray-200">Companies</Link>
                <Link to="/admin/jobs" onClick={closeMenu} className="block text-gray-700 dark:text-gray-200">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={closeMenu} className="block text-gray-700 dark:text-gray-200">Home</Link>
                <Link to="/jobs" onClick={closeMenu} className="block text-gray-700 dark:text-gray-200">Jobs</Link>
                <Link to="/browse" onClick={closeMenu} className="block text-gray-700 dark:text-gray-200">Browse</Link>
              </>
            )
          }
          {
            !user ? (
              <>
                <Link to="/login" onClick={closeMenu}><Button variant='outline' className='w-full'>Login</Button></Link>
                <Link to="/signup" onClick={closeMenu}><Button className="w-full bg-blue-600 text-white">Signup</Button></Link>
              </>
            ) : (
              <>
                {user?.role === 'student' && (
                  <Link to="/profile" onClick={closeMenu} className="block text-gray-700 dark:text-gray-200">View Profile</Link>
                )}
                <Button onClick={() => { logoutHandler(); closeMenu(); }} className="w-full" variant="outline">Logout</Button>
              </>
            )
          }
        </div>
      )}
    </header>
  );
};

export default Navbar;
