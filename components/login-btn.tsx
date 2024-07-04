'use client';
// import { signOut, useSession } from 'next-auth/react';
import { db } from './firebase';
import { collection , query } from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore';
import { useSession, signIn, signOut } from "next-auth/react"


export default function LogIn() {
  const { data: session } = useSession()
  // const testVal = useSession()
   const [users, loading, error] = useCollection(query(collection(db, 'users')));
  if (session) {
    return (
      <>
        {/* Signed in as {testVal?.data?.user?.name }<br /> */}
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}