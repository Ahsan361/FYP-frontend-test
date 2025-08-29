import { BrowserRouter, Routes, Route } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
     <UserProvider>
      <BrowserRouter>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
