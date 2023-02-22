import { CourseType } from "@/services/courseService";
import Link from "next/link";
import styles from "./styles.module.scss";

interface props {
  course: CourseType;
}

const SearchCard = function ({ course }: props) {
  return <>
    <Link href={`/courses/${course.id}`} className={styles.link}>
      <div className={styles.searchCard}>
        <img src={course.thumbnailUrl ? `${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}` : '/no-image.png'} alt={course.name} className={styles.searchCardImg}/>
        <p className={styles.searchCardTitle}>{course.name}</p>
        <p className={styles.searchCardDescription}>{course.synopsis}</p>
      </div>
    </Link>
  </>;
};


export default SearchCard;