import FeaturedSection from "@/components/homeAuth/featuredSection";
import HeaderAuth from "@/components/homeAuth/headerAuth";
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
        <FeaturedSection/>
      </main>
    </>
  );
};

export default HomeAuth;