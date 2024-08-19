import { createClient } from '@/utils/supabase/server';
import Nav from '@/components/shared/Nav';
import WelcomeForm from './WelcomeForm';
import ViewJson from '@/components/testing/ViewJSON';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface WelcomeForm {
  fName: string;
  mName?: string;
  lName: string;
  username: string;
  headline?: string;
  summary?: string;
}

export default async function Welcome() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = cookies();
  if (cookieStore.has('hasProfile')) {
    redirect('/profile')
  }

  return (
    <> 
    <Nav loggedIn={user !== null} />
    <main>Welcome to Socialite Media
      <ViewJson jsonData={user} />
      <WelcomeForm user={user} />
    </main>
    </>
  )
}
