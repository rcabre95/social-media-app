'use server'
 
import { cookies } from 'next/headers'
 
async function cookieSet(name: string, data: string) {
  'use server'
  cookies().set(name, data)
}