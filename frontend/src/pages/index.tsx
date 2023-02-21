import Footer from "@/components/common/footer";
import CardsSection from "@/components/homeNoAuth/cardsSection";
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import SlideSection from "@/components/homeNoAuth/slideSection";
import courseService, { CourseType } from "@/services/courseService";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import styles from "../styles/homeNoAuth.module.scss" 

interface IndexPageProps {
  children?: ReactNode;
  courses: CourseType[];
}

const HomeNotAuth = function ({ courses }: IndexPageProps) {
  return (
		<>
			<Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
				<meta property="og:title" content="Onebitflix" key="title" />
				<meta name="description" content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil."/>
      </Head>
			<main>
				<div className={styles.sectionBackground}>
					<HeaderNoAuth />
					<PresentationSection />
				</div>
				<CardsSection />
				<SlideSection newestCourses={courses}/>
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