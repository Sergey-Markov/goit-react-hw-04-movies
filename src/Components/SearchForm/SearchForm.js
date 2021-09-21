import s from "../SearchForm/SearchForm.module.css";

export default function SearchForm({ onClick, onChange }) {
  return (
    <>
      <form name="saerch" className={s.formField}>
        <label name="saerch">Serch</label>
        <input name="saerch" type="text" onChange={onChange}></input>
        <button
          name="saerch"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          search
        </button>
      </form>
    </>
  );
}
