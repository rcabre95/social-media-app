"use client";
import { useState, useEffect } from 'react';
import Nav from '@/components/shared/Nav';
import NewProjectForm from '@/components/shared/new-project/NewProjectForm';
import NewPostForm from '@/components/shared/new-post/NewPostForm';
import ViewJson from '@/components/testing/ViewJSON';

export default function Feed({ userId, profile, onLoad, name }: { userId: string, profile: any, onLoad?: (name: string, data: string) => void, name?: string }) {
  const [showNewProjectForm, setShowNewProjectForm] = useState<boolean>(false);
  const [showNewPostForm, setShowNewPostForm] = useState<boolean>(false);

  const toggleNewProject = () => {
    setShowNewProjectForm(!showNewProjectForm)
  }

  const toggleNewPost = () => {
    setShowNewPostForm(!showNewPostForm)
  }

  useEffect(() => {
    if (onLoad && name) {
      onLoad(name, profile.id)
      console.log("loaded...");
    }
  }, [])

  return ( // TODO: figure out where to put Nav
    <main>
    <Nav loggedIn={true}/>
    <div>Feed</div>
    <button onClick={toggleNewPost} type="button">{!showNewPostForm ? "New Post" : "Cancel"}</button>
    <button onClick={toggleNewProject} type="button">{!showNewProjectForm ? "New Project" : "Cancel"}</button>
    {showNewProjectForm ? <NewProjectForm profileId={profile.id} setShowNewProjectForm={setShowNewProjectForm} /> : null}
    {showNewPostForm ? <NewPostForm userId={userId} profileId={profile.id} setShowNewPostForm={setShowNewPostForm} /> : null}
    </main>
  )
}
