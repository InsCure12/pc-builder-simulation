import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { BuilderPage } from "./pages/BuilderPage";
import { ComponentsPage } from "./pages/ComponentsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="logo">
              PC BUILDER
            </Link>
            <div className="nav-links">
              <Link to="/">Builder</Link>
              <Link to="/components">Components</Link>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BuilderPage />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
