"use client";
import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client';
import { useForm } from 'react-hook-form';

export interface IEmailLogin {
  email: string;
  password: string;
  confirmPass: string;
}

export default function SignIn() {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IEmailLogin>();

  const onSubmit: () => void = handleSubmit(async (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  })

  // TODO: change this to sign up
  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "http://localhost:3000/new-member"
      }
    });
  };

  return (
    // TODO: input text is white for some reason. change that.
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}
      className="flex flex-col">
        <label htmlFor="emailInput">Email</label>
        <input placeholder='example@email.com' type="email" {...register("email", {
          required: "You must enter a valid email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          },
        })} />
        {errors.email ? <p>{errors.email.message}</p> : null}

        <label htmlFor="passwordInput">Password</label>
        <input placeholder='********'
        type="password" {...register("password", {
          required: "You must enter a password",
          minLength: {
            value: 8,
            message: "Password must contain at least 8 characters"
          }
        })} />
        {errors.password ? <p>{errors.password.message}</p> : null}


        <label htmlFor="confirmPassInput">Confirm Password</label>
        <input placeholder='********'
        type="password" {...register("confirmPass", {
          required: "You must confirm your password",
          validate: (val: string) => {
            if (watch('password') != val) {
              return "Your passwords do not match"
            }
          }
        })} />
        {errors.confirmPass ? <p>{errors.confirmPass.message}</p> : null}

        <button type="submit">Sign up with Email</button>
      </form>
      <div className="px-6 sm:px-0 max-w-sm">
      <button
      onClick={signInWithGoogle}
      type="button"
      className="py-2 px-4 max-w-md flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
        <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
        </svg>
        Sign in with Google
      </button>
</div>
    </div>
  )
}
