// 'use client'
import Image from "next/image";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";



export default async function Home() {
  const cookieStore = await cookies(); // => 'value'
  const token = cookieStore.get('token'); //



  if (!token) {
    redirect('/login');
  }

  return (<div className="flex flex-col items-center justify-center gap-4">
    <Tasks />
  </div>

  );
}
