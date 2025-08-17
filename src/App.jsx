import { BrowserRouter, Routes, Route } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routesConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
