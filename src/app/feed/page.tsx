import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/shared/Nav";

export default async function Feed() {
  const cookieStore = cookies();
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log(user)


  if (user) {
    if (cookieStore.has('hasProfile')) {
      return (
        <div>
          <Nav loggedIn={true} />
          Feed
        </div>
      )
    } else {
      const { data, error } = await supabase.from('profiles').select('id').eq('user_id', user.id);
      if (data && data.length > 0) {
        cookieStore.set('hasProfile', data[0].id)
        return (
          <div>
            <Nav loggedIn={true} />
            FEED
          </div>
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
