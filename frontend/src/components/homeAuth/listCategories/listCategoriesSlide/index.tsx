import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import categoriesService from "../../../../services/categoriesService";
import SlideComponent from "@/components/common/slideComponent";
// import SwrSpinner from "../../../common/swrSpinner";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = function ({ categoryId, categoryName }: props) {
  const { data, error } = useSWR(`/categories/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) return error;
  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data?.data.courses} />
    </>
  );
};

export default ListCategoriesSlide;