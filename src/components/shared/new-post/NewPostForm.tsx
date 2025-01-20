"use client";
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

interface IPostInsert {
  content: string;
  title: string;
  media: FileList;
  profile_id: number;
  project_id: string | null;
}

export default function NewPostForm({ userId, project, profileId, setShowNewPostForm }: { userId: string, project?: string, profileId: number, setShowNewPostForm: Dispatch<SetStateAction<boolean>> }) {

  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IPostInsert>({
    defaultValues: {
      project_id: project ? project : null,
    }
  });

  const onSubmit: SubmitHandler<IPostInsert> = async (data) => {
    // TODO: finish onSubmit
    setLoading(true);
    console.log(data);
    const fileListAsArray = Array.from(data.media);
    let media: Array<string> = fileListAsArray.map((file) => {
      return `${userId}/${profileId}-${file.name}`
    })
    
    
    const post =  await supabase.from('posts').insert({
      user_id: userId,
      content: data.content,
      title: data.title,
      media: media,
      profile_id: profileId,
      project_id: data.project_id
    }).select();
    
    if (!post.error) {
      for (let i = 0; i < fileListAsArray.length; i++) {
        console.log(`${userId}/${profileId}-${fileListAsArray[i].name}`)
        let thisUpload = await supabase.storage.from('posts').upload(`${userId}/${profileId}-${fileListAsArray[i].name}`, data.media[i], {
          cacheControl: '3600',
          upsert: false
        })
        if (thisUpload.error) {
          toast.error(thisUpload.error.message);
          console.log("Upload Error:" + JSON.stringify(thisUpload.error.message));
          setShowNewPostForm(false);

          break;
        }
      }
      // var upload = await supabase.storage.from('posts').upload(`${userId}/${profileId}-${post.data[0].name}`, data.media[0]);
      // if (upload.error) {
      //   toast.error(upload.error.message );
      // } else {
      //   console.log(`Upload Error: ${JSON.stringify(upload.error)}`)
      //   setShowNewPostForm(false);
      // }
    } else {
      console.log(`Post Error: ${JSON.stringify(post.error.message)}`)
      toast.error(post.error.message);
    };

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

        <label aria-hidden={true} className='hidden' htmlFor="projectInput">Project Collab</label>
        <input aria-hidden={true} className='hidden' id="projectInput" type="text" {...register("project_id", {

        })} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
