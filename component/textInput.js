import style from "/styles/login.module.css";
export default function TextInput({ changeState, label }) {
  const handleFunction = (e) => {
    changeState(e.target.value);
  };

  return (
    <div className={style.input_group}>
      <input
        type="text"
        className={style.hover_input}
        placeholder=" "
        onChange={handleFunction}
      />
      <label className={style.hover_label}>{label}</label>
    </div>
  );
}
