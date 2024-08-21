import Image from "next/image";
import SignIn from "@/components/auth/SignUp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn />
    </main>
  );
}

// TODO: admin panel
// TODO: Project pages
// TODO: Feed
// TODO: figure out profile photos, background photos, and buckets in general