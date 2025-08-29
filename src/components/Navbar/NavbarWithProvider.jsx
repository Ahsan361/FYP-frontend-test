import { useState } from "react";
import { UserContext } from "../contexts/UserContext"; 
import Navbar from "./Navbar";

function NavbarWithProvider() {
  const [user, setUser] = useState(null); // ⬅️ initially no user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
    </UserContext.Provider>
  );
}

export default NavbarWithProvider;
