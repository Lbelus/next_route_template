import React from "react";
import Head from "next/head";
import Link from "next/link";
import LogIn from "../components/login-btn";
export default function Home() {
  return (
    <>
      <Head>
        <title>this our sweet lovely app.</title>
        <meta
          name="description"
          content="This is an api route template"
        />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link href="/" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
            {<LogIn/>}
          </Link>
    </div>
    </>
  );
}
