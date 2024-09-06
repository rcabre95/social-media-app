'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Feed from './Feed'

// TODO: create context for user

export default async function FeedPage() {
  const cookieStore = cookies();
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log(user)

  async function cookieSet(name: string, data: string) {
    'use server'
    cookies().set(name, data)
  }


  if (user) {
    if (cookieStore.has('hasProfile')) {
      const { data, error } = await supabase.from('profiles').select('id').eq('user_id', user.id);
      if (data && data.length > 0) {
        return (
          <Feed userId={user.id} profile={data[0]} />
        )
      }
    } else {
      // TODO: handle errors (error variable)
      const { data, error } = await supabase.from('profiles').select('id').eq('user_id', user.id);
      if (data && data.length > 0) {
        return (
          <Feed userId={user.id} onLoad={cookieSet} name={'hasProfile'} profile={data[0]} />
        )
      } else {
        redirect('/welcome');
      }
    }
  } else {
    return (
      <div>Not logged in</div>
    )
  }
}
