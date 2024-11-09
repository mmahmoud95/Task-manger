'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email === '') return toast.error('Email is required');
    if (password === '') return toast.error('Password is required');

    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(res)
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        toast.success(data.message);
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        const data = await res.json();
        console.log(data);
        toast.error(data.error || 'login failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form
        className="flex flex-col bg-slate-400 p-12 border-2 w-full"
        onSubmit={submitHandler}
      >
        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          placeholder="Enter your Email"
          className="border rounded-none mb-2 p-2 md:w-[320px] sm:w-96 outline-offset-1 outline-sky-900 focus:rounded-none"
        />
        <input
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          placeholder="Enter your Password"
          className="border rounded-none mb-2 p-2 md:w-[320px] sm:w-96 outline-offset-1 outline-sky-900 focus:rounded-none"
        />
        <button
          type="submit"
          className="bg-green-600 p-2 text-2xl text-white mt-4"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Login'}
        </button>
        <p className="text-lg text-white mt-6">
          You have not account, Please{' '}
          <Link className="text-sky-900" href="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;