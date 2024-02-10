import style from "/styles/new.module.css";

export default function Notice({ title, msg }) {
  return (
    <div className={style.notice}>
      <div className={style.inner_notice}>
        <div className={style.header}>
          <h2>{title}</h2>
        </div>
        <div className={style.content}>
          <span> {msg}</span>
        </div>
      </div>
    </div>
  );
}
