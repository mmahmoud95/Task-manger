'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

const Header = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (res.ok) {
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className='flex items-center justify-center gap-4 w-11/12 text-center mt-0 ms-auto me-auto mb-8 bg-[#2c0a4c] p-4'>
      <img src="task-management-logo.png" alt="A todo list" className='w-14 object-contain' />
      <div className='flex'>
        <div><h1 className='text-4xl font-semibold'>EasyTask</h1>
          <p>Enterprise-level task management without friction</p></div>


      </div>
      <button onClick={() => logOut()}
        className="bg-red-500 text-white py-1 px-4 rounded-full ms-14 font-semibold text-base sm:text-sm text-right hover:bg-red-300 hover:text-slate-900 transition ease-in-out duration-200"
      >
        Log out
      </button>
    </header >
  )
}

export default Header