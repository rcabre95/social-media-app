"use client";
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IPostInsert {
  content: string;
  title: string;
  media: string;
}

export default function NewPostForm({ profileId, setShowNewPostForm }: { profileId: string, setShowNewPostForm: Dispatch<SetStateAction<boolean>> }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IPostInsert>();

  const onSubmit: SubmitHandler<IPostInsert> = async (data) => {
    // TODO: finish onSubmit
  }

  return (
    <div>
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

        <label htmlFor="mediaInput">Content</label>
        <input id="mediaInput" type="text" {...register("media", {
          // TODO: figure out file inputs
        })}/>
      </form>
    </div>
  )
}
