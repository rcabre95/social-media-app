"use client";
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
// TODO: make form more accessible https://react-hook-form.com/advanced-usage

interface WelcomeForm {
  fName: string;
  mName?: string;
  lName: string;
  username: string;
  headline?: string;
  summary?: string;
}

export default function WelcomeForm({ user }: { user: any }) {
  const supabase = createClient();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [checking, setChecking] = useState<boolean>(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [debouncedUsername] = useDebounce(username, 500);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(['hasProfile', 'tutorialMode']);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<WelcomeForm>({
    defaultValues: {
      fName: '',
      lName: '',

    }
  });

  const onSubmit: SubmitHandler<WelcomeForm> = async (data) => {
    setLoading(true);
    if (isValid) {
      console.log(data);
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          headline: data.headline,
          summary: data.summary,
          theme: "default",
          first_name: data.fName,
          middle_name: data.mName || null,
          last_name: data.lName,
          subdirectory: data.username
        });
      if (error) {
        toast.error(error.message);
      } else {
        setCookie('hasProfile', true, { path: '/'});
        setCookie('tutorialMode', true, { path: '/' });
        router.push("/feed");
      }
      setLoading(false);
    } else {
      toast.error("Please check your inputs and try again.")
    }
    setLoading(false);
  }

  useEffect(() => {
    setChecking(true);
    // check if username is available
    const checkUsername = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("subdirectory")
        .eq('subdirectory', debouncedUsername)

      if (data!.length < 1) {
        console.log(error)
        setUsernameAvailable(true);
      } else {
        console.log(data)
        setUsernameAvailable(false);
      }
    }

    checkUsername()
      .catch(err => {
        console.log(err)
      })
    
    setChecking(false);
  }, [debouncedUsername])



  const handleUsernameChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    if (!errors.username) {
      setUsername((event.currentTarget as HTMLInputElement).value)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label htmlFor="fNameInput">First Name</label>
        <input type="text" id="fNameInput" {...register("fName", {
          required: {
            value: true,
            message: "Please enter your first name"
          },
          pattern: {
            value: /^[a-zA-Z ]*$/,
            message: "Please enter a valid name"
          },
          minLength: {
            value: 2,
            message: "Please enter a valid first name"
          },
          maxLength: {
            value: 40,
            message: "Please enter a valid first name"
          }
        })}/>
        <p>{errors.fName ? errors.fName.message : null}</p>

        <label htmlFor="mNameInput">Middle Name</label>
        <input type="text" id="mNameInput" {...register("mName", {
          pattern: {
            value: /^[a-zA-Z ]*$/,
            message: "Please enter a valid name or initial"
          },
          maxLength: {
            value: 40,
            message: "Please enter a valid name"
          }
        })} />
        <p>{errors.mName ? errors.mName.message : null}</p>


        <label htmlFor="lNameInput">Last Name</label>
        <input type="text" id="lNameInput" {...register("lName", {
          required: {
            value: true,
            message: "Please enter your last name"
          },
          pattern: {
            value: /^[a-zA-Z ]*$/,
            message: "Please enter a valid name"
          },
          minLength: {
            value: 2,
            message: "Please enter a valid last name"
          },
          maxLength: {
            value: 40,
            message: "Please enter a valid last name"
          }
        })}/>
        <p>{errors.lName ? errors.lName.message : null}</p>


        <label htmlFor="username">Custom Profile URL</label>
        <input type="text" id="username" {...register("username", {
          onChange: (e) => handleUsernameChange(e),
          required: {
            value: true,
            message: "Please enter a username. This will act as the subdirectory in the link to your profile"
          },
          pattern: {
            value: /^[a-zA-Z0-9\-]+$/,
            message: "Please use only letters, numbers, and hyphens. No other special characters are allowed"
          },
          minLength: {
            value: 3,
            message: "Please enter a longer username"
          },
          maxLength: {
            value: 100,
            message: "Please enter a shorter username"
          }
        })} />
        <p>{errors.username ? errors.username.message : checking ? "Checking..." : usernameAvailable === null ? null : usernameAvailable === true ? "Username is available!" : "Username is not available."}</p>
        <p>ex: http://www.examplesite.com/{watch("username")}</p>
        {/* TODO: change examplesite to something that reads the current URL (usePathName and trim) */}
        {/* TODO: maybe integrate the username available markers with the example url */}
        {/* TODO: List out errors separately for each field ex: https://react-hook-form.com/advanced-usage */}
        {/* TODO: eventually test all form validation */}

        <label htmlFor="headlineInput">Headline</label>
        <input type="text" id="headlineInput" {...register("headline", {
          // TODO placeholder text "Creator" or in supabase default value "creator"
        })} />

        <label htmlFor="summaryInput">Summary</label>
        <textarea id="summaryInput" rows={4} cols={50} {...register("summary", {
          maxLength: {
            value: 1000,
            message: "Please ensure that your summary is under 1000 characters long"
          }
        })}></textarea>
        {/* TODO: research special characters like quotations and slashes */}
        <p>{errors.summary ? errors.summary.message : null}</p>


        <button type="submit">Submit</button>
      </form>
  )
}
