import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderGeneric from "@/components/common/headerGeneric";
import courseService, { CourseType } from "@/services/courseService";
import { useState, useEffect } from "react";
import PageSpinner from "@/components/common/pageSpinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

const EpisodePlayer = function () {
  const router = useRouter();
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";
  const [course, setCourse] = useState<CourseType>();

  const getCourse = async function () {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(`/courses/episode/${episodeOrder - 1}?courseid=${courseId}`);
  };
  const handleNextEpisode = () => {
    router.push(`/courses/episode/${episodeOrder + 1}?courseid=${courseId}`);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }
  if (course?.episodes == undefined) return <PageSpinner />;
  return (
    <>
      <Head>
	      <title>Onebitflix - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric logoUrl="/home" btnContent={`Voltar para o curso`} btnUrl={`/courses/${courseId}`} />
        <Container className="d-flex flex-column align-items-center gap-3 pt-3">
          <p className={styles.episodeTitle}>
            {course.episodes[episodeOrder].name}
          </p>
          {typeof window == "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${localStorage.getItem("onebitflix-token")}`}
              controls
            />
          )}
          <div className={styles.episodeButton}>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder === 0 ? true : false}
              onClick={handleLastEpisode}
            >
              &#x2B05;
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={
                episodeOrder + 1 === course.episodes.length ? true : false
              }
              onClick={handleNextEpisode}
            >
              &#x27A1;
            </Button>
          </div>
          <p className="text-center pb-4">
            {course.episodes[episodeOrder].synopsis}
          </p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;