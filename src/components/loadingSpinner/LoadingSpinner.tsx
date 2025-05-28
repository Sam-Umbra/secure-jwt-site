import style from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={style.container}>
      <div className={style.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
