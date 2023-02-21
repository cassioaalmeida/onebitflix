import HeaderAuth from "@/components/headerAuth";
import Head from "next/head";
import { useEffect } from "react";

const HomeAuth = function () {
  return (
    <>
			<Head>
        <title>Onebitflix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth/>
        <p>Você está logado!</p>
      </main>
    </>
  );
};

export default HomeAuth;