import FindMeIcon from "./FindMeIcon";

export default function Input({
  cityInfo,
  setSearch,
  setCityInfo,
  error,
  setError,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    setSearch(e.target[0].value);
  }
  function handleClick(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setCityInfo((cityInfo) => ({
          ...cityInfo,
          coords: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          },
        }));
      },
      () => {
        setError("Your location could not be determined");
      }
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput">Your city</label>
        <input type="text" id="textInput" defaultValue={cityInfo.name} />
      </form>
      <button onClick={handleClick} aria-label="Find my location">
        <FindMeIcon width={24} height={24} />
      </button>
      {error && <p>{error}</p>}
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          grid-area: input;
        }
        form {
          display: flex;
          align-items: center;
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
        button {
          display: flex;
          border: none;
          background: none;
          margin-left: 20px;
          cursor: pointer;
        }
        button:hover :global(svg) {
          fill: #5596f6;
        }
        @media screen and (min-width: 1140px) {
          div {
            justify-content: start;
            margin-left: 20px;
          }
        }
        @media screen and (max-width: 500px) {
          form,
          button,
          label {
            display: block;
          }
          button {
            margin-top: 20px;
          }
          input {
            width: calc(100vw - 180px);
          }
        }
      `}</style>
    </div>
  );
}
