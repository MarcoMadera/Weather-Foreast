export default function Input({ setSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    setSearch(e.target[0].value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="textInput">Your city</label>
      <input type="text" id="textInput" defaultValue="London" />
      <style jsx>{`
        form {
          display: flex;
          align-items: center;
          grid-area: input;
          justify-self: center;
        }
        label {
          margin-right: 10px;
          font-size: 18px;
        }
        input {
          border: 1px solid rgb(184, 184, 184);
          border-radius: 5px;
          padding: 15px;
        }
      `}</style>
    </form>
  );
}
