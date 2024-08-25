import ViewJson from "@/components/testing/ViewJSON";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function Project({ params }: { params: { project: string }}) {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').select("*").eq('subdirectory', params.project);
  // TODO: implement project feed

  if (error) {
    redirect("/"); // TODO: think about where these redirects should actually go
  } else if (!data) {
    redirect("/");
  } else {
    const project = data[0];
    return (
      <main>
        {/* TODO: hydrate with project data */}
        {/* TODO: hydrate with project posts data */}
        <ViewJson jsonData={project} />
      </main>
    )
  }
}
