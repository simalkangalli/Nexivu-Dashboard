import styles from "./pagination.module.css";

const Pagination = () => {
  return <div className={styles.container}>
    <div className={styles.pagination}>
        <button className={styles.button}>Previous</button>
        <button className={styles.button}>Next</button>
    </div>
    </div>;
};

export default Pagination;