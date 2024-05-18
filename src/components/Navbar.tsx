import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <h1>
        <Link to={"/"}>Movies App</Link>
      </h1>
    </header>
  );
}
