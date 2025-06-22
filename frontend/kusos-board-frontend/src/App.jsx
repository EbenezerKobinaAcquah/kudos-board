import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import KudoBoard from "./components/KudoBoard";

function App() {
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
          <Header />
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
