import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Nav from '@/components/shared/Nav';

export default async function NewMember() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  console.log(`user: ${user}`);
  // if (user == null) {
  //   redirect("/");
  // } else {
  //   return (
  //     <div>NewMember</div>
  //   )
  // }

  return (
    <>
    <Nav loggedIn={user !== null} />
    <div>Welcome to Socialite Media
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
    </>
  )
}
