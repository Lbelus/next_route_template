'use client';
import { useSession, signIn, signOut } from "next-auth/react"


export default function LogIn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {/* Signed in as {testVal?.data?.user?.name }<br /> */}
        Signed in as {session.user?.email} <br />
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