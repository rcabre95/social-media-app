import NewPostForm from "@/components/shared/new-post/NewPostForm";
import ViewJson from "@/components/testing/ViewJSON";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import Project from "./Project";

export default async function ProjectPage({ params }: { params: { project: string }}) {
  const supabase = createClient();
  const { data: projects, error: projectError } = await supabase.from('projects').select("*").eq('subdirectory', params.project);
  const { data: { user } } = await supabase.auth.getUser();

  var profile: { id: number } = { id: -1 };
  if (user) {
    const { data: profiles, error: profileError } = await supabase.from('profiles').select('id').eq('user_id', user.id);
    if (profiles){
      profile = profiles[0]
    }
  }


  // TODO: implement project feed

  if (projectError) {
    redirect("/"); // TODO: think about where these redirects should actually go
  } else if (!projects) {
    redirect("/");
  } else {
    const project = projects[0];
    return (
      <main>
        {/* TODO: hydrate with project data */}
        {/* TODO: hydrate with project posts data */}
        <ViewJson jsonData={project} />
        <Project user={user} project={projects[0].id} profile={profile.id} />
      </main>
    )
  }
}

// TODO: Question: How do i link the post to the project?
// Would it be a dropdown menu? autocomplete?
// Maybe you have to go to the project first and then click "add post"
// or something. that way you can automatically grab whatever data you need
// so you can reference it in the post.
// Maybe you can go to "my projects" or something and select from there,
// but you would first have to be added to the project so that you can
// have the ability to post on that project's behalf