import styles from "../styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "@/components/homeAuth/headerAuth";
import { useRouter } from "next/router";
import courseService, { CourseType } from "@/services/courseService";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import SearchCard from "@/components/searchCard";
import Footer from "@/components/common/footer";
import PageSpinner from "@/components/common/pageSpinner";

const Search = function () {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const searchName = router.query.name;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchCourses();
  }, [searchName]);

  const searchCourses = async function () {
    if (typeof searchName === "string") {
      const res = await courseService.getSearch(searchName);
      console.log(res.data.courses)
      setSearchResult(res.data.courses);
    }
  };
  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}> 
          <HeaderAuth />
        </div>
        <section className={styles.mainContent}>
          {searchResult.length >= 1 ? (
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          ) : (
            <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
          )}
        </section>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Search;