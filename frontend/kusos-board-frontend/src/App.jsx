import { useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import Button from "./components/ViewBoardButton";
import "./App.css";
import KudoBoardCard from "./components/KudoBoardCard";
import Footer from "./components/Footer";
import KudoBoard from "./components/KudoBoard";

function App() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState(true);

  function handleToggleMode() {
    setMode(!mode);
  }

  // Compute a class based on mode
  const bodyMode = mode ? "body body-light" : "body body-dark";

  return (
    <>
      <div className={bodyMode}>
        <div className="mode">
          <Header
          />
          <div className="modeButton">
          <button onClick={handleToggleMode}>
            {mode ? "Dark Mode 🌚" : "Light Mode 🌞"}
          </button>
          </div>
          <KudoBoard />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
