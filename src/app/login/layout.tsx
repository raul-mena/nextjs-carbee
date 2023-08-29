"use client";

import '../globals.css'
import { redirect } from 'next/navigation'
import { AUTH_TOKEN_KEY } from '@/global/constants';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  if( !!sessionStorage.getItem(AUTH_TOKEN_KEY) ){
    redirect('/dashboard')
  }

  return (
    <div>{children}</div>
  )
}
