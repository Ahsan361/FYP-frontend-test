import { BrowserRouter, Routes, Route } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext"; 

function App() {
  return (
     <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {routesConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
