import "./Loading.css";

function Loading({ name }) {
  return (
    <div className={name}>
      <span className="loading__drop" />
      <span className="loading__drop" />
      <span className="loading__drop" />
    </div>
  );
}

export default Loading;
