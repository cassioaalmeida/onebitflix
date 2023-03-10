import Footer from "@/components/common/footer";
import CardsSection from "@/components/homeNoAuth/cardsSection";
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import SlideSection from "@/components/homeNoAuth/slideSection";
import courseService, { CourseType } from "@/services/courseService";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import styles from "../styles/homeNoAuth.module.scss" 
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";

interface IndexPageProps {
  children?: ReactNode;
  courses: CourseType[];
}

const HomeNotAuth = function ({ courses }: IndexPageProps) {
  const router = useRouter();
  useEffect(() => {
    AOS.init();
  }, []);
    
  useEffect(() => {
    if (localStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);
  
  return (
		<>
			<Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
				<meta property="og:title" content="Onebitflix" key="title" />
				<meta name="description" content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil."/>
      </Head>
			<main>
        <div className={styles.sectionBackground} data-aos="fade-zoom-in" data-aos-duration="1600">
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <SlideSection newestCourses={courses} />
        </div>
        <Footer />
      </main>
		</>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      courses: res.data,
    },
    revalidate: 3600 * 24,
  };
};

export default HomeNotAuth;