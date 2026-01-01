import "./Loading.css";

function Loading({ name }) {
  return (
    <div className={name}>
      <span className="loading__span">.</span>
      <span className="loading__span">.</span>
      <span className="loading__span">.</span>
    </div>
  );
}

export default Loading;
