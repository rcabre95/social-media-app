"use client";
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

interface IPostInsert {
  content: string;
  title: string;
  media: FileList;
  project: string | null;
}

export default function NewPostForm({ userId, profileId, setShowNewPostForm }: { userId: string, profileId: number, setShowNewPostForm: Dispatch<SetStateAction<boolean>> }) {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IPostInsert>();

  const onSubmit: SubmitHandler<IPostInsert> = async (data) => {
    // TODO: finish onSubmit
    setLoading(true);
    console.log(data);
    // check if project is filled out or not
    if (!data.project) {
      // if not filled out, continue as normal
    } else {
      // if filled out, check if project exists (or don't?)
    }
    // const { error } =  await supabase.from('posts').insert({
    //   user_id: userId,
    //   content: data.content,
    //   title: data.title,
    //   media: data.media[0].name
    // });
    // if (error) {
    //   toast.error(error.message);
    // } else {
    //   setShowNewPostForm(false);
    // }
    setLoading(false);
  }

  return (
    <div>
      <button onClick={() => setShowNewPostForm(false)} type="button">x</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="titleInput">Title</label>
        <input id="titleInput" type="text" {...register("title", {
          required: {
            value: true,
            message: "You must name your post"
          },
        })}/>

        <label htmlFor="contentInput">Content</label>
        <input id="contentInput" type="text" {...register("content", {
          required: {
            value: true,
            message: "You must have something to say"
          },
        })}/>

        <label htmlFor="mediaInput">Attach media</label>
        <input type="file" id="mediaInput" {...register("media", {
          // TODO: figure out file inputs
        })}/>

        <label htmlFor="projectInput">Project Collab</label>
        <input id="projectInput" type="text" {...register("project", {

        })} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
