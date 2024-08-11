"use client"
import React from 'react';
import SecondaryBtn from './SecondaryBtn';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// TODO: Loosely model after linkedin UI/UX
export default function Nav({ loggedIn }: { loggedIn: boolean }) {
  const supabase = createClient();
  const router = useRouter();

  const logOut = async () => {

    let { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Something went wrong.")
      return;
    }
    
    router.push("/");
  }

  return (
    <header>
      {loggedIn ? 
        <SecondaryBtn
          type='button'
          text='Log Out'
          action={logOut}
        /> :
      null}
    </header>
  )
}