import { Link } from "react-router-dom";

const AnotherPage = () => {
  return (
    <Link to="/">
      <button>{"<- Go back"}</button>
    </Link>
  );
};

export default AnotherPage;
