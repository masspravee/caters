import styles from "@/styles/Welcome.module.css";
import checkNumber from "./checknumber";
export default function Article({ data, img, indexNum }) {
  const { text1, text2, text3 } = data;

  var indexValue = checkNumber(indexNum);

  return (
    <article className={indexValue ? styles.contentLeft : styles.content}>
      <div className={`${styles.details} ${styles.gridItem} `}>
        {text1 && <span className={styles.heads}>{text1}</span>}
        {text2 && <span>{text2}</span>}
        {text3 && <p>{text3}</p>}
      </div>
      <div className={`${styles.image_container} ${styles.gridItem}`}>
        <img src={img} alt="Image Not Found" />
      </div>
    </article>
  );
}
