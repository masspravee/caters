import style from "/styles/new.module.css";

export default function Notice({ changeState, title, msg, name }) {
  const handleChange = () => {
    changeState((prevState) => !prevState);
  };

  return (
    <div className={style.notice}>
      <div className={style.inner_notice}>
        <div className={style.header}>
          <h2>{title}</h2>
        </div>
        <div className={style.content}>
          <span> {msg}</span>
        </div>
        <div className={style.footer}>
          <button onClick={handleChange}>{name}</button>
        </div>
      </div>
    </div>
  );
}
