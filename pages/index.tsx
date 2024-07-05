import React from "react";
import Head from "next/head";
import Link from "next/link";
import LogIn from "../components/session/login-btn";

export default function Home() {
  return (
    <>
      <Head>
        <title>This is our sweet lovely app.</title>
        <meta name="description" content="This is an api route template" />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <header className="bg-gray-800 p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl text-white font-bold">
            Home
          </Link>
          <div className="hidden space-x-4 lg:flex">
            <Link href="/">
              <div className="px-6 py-2 text-white bg-indigo-600 rounded-md">
                <LogIn />
              </div>
            </Link>
          </div>
        </nav>
      </header>

      <main className="p-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to our App!</h1>
          <p className="text-lg">This is a public page</p>
        </section>

        <section className="mb-8">
          <Link href="/private">
            <div className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100 hover:underline">
              Go to private page
            </div>
          </Link>
        </section>

        <section>
          <Link href="/Verceldoc">
            <div className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100 hover:underline">
              Access Vercel documentation on Next.js
            </div>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white">
        &copy; 2024 Our Sweet Lovely App
      </footer>
    </>
  );
}
