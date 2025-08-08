function NavbarWithProvider () {
  const user = { name: "John Doe", email: "john.doe@example.com", avatar: "/avatar.png" };
  return (
    <UserContext.Provider value={user}>
      <Navbar />
    </UserContext.Provider>
  );
};

export default NavbarWithProvider;