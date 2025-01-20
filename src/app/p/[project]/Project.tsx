"use client";
import NewPostForm from '@/components/shared/new-post/NewPostForm'
import { User } from '@supabase/supabase-js';
import React, { useState } from 'react'

export default function Project({ user, project, profile }: { user: User | null, project?: string, profile: number}) {
  const [showNewPostForm, setShowNewPostForm] = useState<boolean>(false);

  return (
    <section>
      Project
      <button onClick={() => { setShowNewPostForm(!showNewPostForm) }} type="button">Show Form</button>
      {user && profile > -1 && showNewPostForm ? 
        <NewPostForm project={project} userId={user.id} profileId={profile} setShowNewPostForm={setShowNewPostForm} />
      : null}

      {/* TODO: Change the above */}
    </section>
  )
}
