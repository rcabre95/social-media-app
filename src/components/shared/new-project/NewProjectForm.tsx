'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IProjectInsert {
  title: string;
  type: "television" | "film" | "videogame" | "music video" | "";
  allow_posts: boolean;
  phase: string;
  subdirectory: string;
}

export default function NewProjectForm({ profileId, setShowNewProjectForm }: { profileId: string, setShowNewProjectForm: Dispatch<SetStateAction<boolean>> }) {
  const supabase = createClient();
  const router = useRouter();
  const [projectSlug, setProjectSlug] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedProjectSlug] = useDebounce(projectSlug, 500);


  const { register, handleSubmit, formState: { errors, isValid } } = useForm<IProjectInsert>({
    defaultValues: {
      phase: 'ideation',
      allow_posts: true,
    }
  });

  const onSubmit: SubmitHandler<IProjectInsert> = async (data) => { // TODO: change any to match data
    setLoading(true);
    if (slugAvailable) {
      const { error } = await supabase.from('projects').insert(data);
      if (error) {
        toast.error(`An error has occured: ${error.message}`)
        console.log(error);
      } else {
        toast.success(`Your project has been create! 🎉`)
        setShowNewProjectForm(false);
      }
    }
    setLoading(false);
  }

  const handleSlugChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    if (!errors.subdirectory) {
      setProjectSlug((event.currentTarget as HTMLInputElement).value)
    }
  }

  useEffect(() => {
    setChecking(true);
    const checkSlug = async () => {
      const { count, error } = await supabase
        .from('projects')
        .select('subdirectory', { count: 'exact', head: true });

      if (error) {
        toast.error(`Something went wrong: ${error.message}`);
      } else {
          if (count) {
            if (count < 1) {
              setSlugAvailable(true)
            } else {
              setSlugAvailable(false)
            }
          } else {
              toast.error(`Something went wrong`);
          }
      }
    }

    checkSlug().catch((err) => {
      toast.error(`Something went wrong: ${err}`);
      console.log(err)
    })

    setChecking(false);
  }, [debouncedProjectSlug])

  return (
    <div>
      <h1>New Project</h1>
      {/* TODO: Finish validation */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="titleInput">Project Title</label>
        <input id="titleInput" type="text" {...register("title", {
          required: {
            value: true,
            message: 'Please enter a title for your project'
          },
          minLength: {
            value: 1,
            message: "Please choose a longer project title"
          },
          maxLength: {
            value: 500,
            message: "Please choose a shorter project title"
          }
        })} />

        <label htmlFor="typeInput">Project Type</label>
        <input id="typeInput" type="text" {...register("type", {
          required: true
        })} />

        <label htmlFor="allowPostsInput">Allow posts?</label>
        <input id="allowPostsInput" type="checkbox" {...register("allow_posts", {

        })} />

        <label htmlFor="phaseInput">Project Phase</label>
        <input id="phaseInput" type="text" {...register("phase", {
          required: true
        })} />

        <label htmlFor="subdirectoryInput">Link Name</label>
        <input id="subdirectoryInput" type="text" {...register("subdirectory", {
          onChange: (e) => handleSlugChange(e)
          // TODO: finish checking flow
        })} />

        <button disabled={loading || !slugAvailable} type="submit">Submit</button>
      </form>
    </div>
  )
}
