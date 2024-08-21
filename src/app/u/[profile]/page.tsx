import ViewJson from "@/components/testing/ViewJSON";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function Profile({ params }: { params: { profile: string } } ) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('subdirectory', params.profile);
  const { data: { user } } = await supabase.auth.getUser();

  if (data) {
    if (data.length < 1) {
      redirect("/not-found");
    } else {
      return (
        <div>
          Profile
          {user ? 
            data[0].user_id === user.id ?
              <button type="button">Edit Profile</button> :
              <button type="button">Connect</button> :
              // TODO: Button functionality
          null}
          <ViewJson jsonData={data}/>
          <ViewJson jsonData={user}/>
          <ViewJson jsonData={params.profile}/>
        </div>
      )
    }
  } else {
    redirect("/not-found")
  }

}

// TODO: consider route prefixes for profiles, projects, and groups
// TODO: report button (handle in database as well)