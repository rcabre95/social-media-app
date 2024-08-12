import { createClient } from '@/utils/supabase/server';
import { SubmitHandler, useForm } from 'react-hook-form';
import Nav from '@/components/shared/Nav';

interface WelcomeForm {
  fName: string;
  mName?: string;
  lName: string;
  username: string;
  headline?: string;
  summary?: string;
}

export default async function NewMember() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<WelcomeForm>({
    defaultValues: {
      fName: ''
    }
  });

  const onSubmit: SubmitHandler<WelcomeForm> = async (data) => {
    
  }

  // TODO: generate profile id: concat(fname-lname) check database for similar instances, and add a number based on the amount of instances (count() - 1)

  // TODO: rethink the profile thing. it should be unique, but it doesn't have to be the ID. they should be able to change it

  return (
    <> 
    <Nav loggedIn={user !== null} />
    <main>Welcome to Socialite Media
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fNameInput">First Name</label>
        <input type="text" id="fNameInput" {...register("fName", {

        })}/>
      </form>
    </main>
    </>
  )
}
