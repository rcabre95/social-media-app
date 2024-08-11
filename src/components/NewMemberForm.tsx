import React from 'react'
import { useForm } from 'react-hook-form'

export default function NewMemberForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const action: () => void = handleSubmit(async (data) => {

  });

  return (
    <form action={action}>
      
    </form>
  )
}
