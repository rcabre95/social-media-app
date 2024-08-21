"use client";
import { useState, useEffect } from 'react';
import Nav from '@/components/shared/Nav';

export default function Feed({ profile, onLoad, name }: { profile: any, onLoad?: any, name?: string }) {

  useEffect(() => {
    if (onLoad && name) {
      onLoad(name, profile.id)
      console.log("loaded...");
    }
  }, [])

  return (
    <>
    <Nav loggedIn={true}/>
    <div>Feed</div>
    </>
  )
}
