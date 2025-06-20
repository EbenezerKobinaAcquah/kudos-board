import headerLogo from "../assets/images/medal.jpg";
import "./Header.css";

export default function Header({ mode, setMode}) {

  return (
    <>
      <header className="header">
        <img src={headerLogo} alt="header logo" width="50px"></img>
        <h1>KUDOBOARD</h1>
      </header>
    </>
  );
}
