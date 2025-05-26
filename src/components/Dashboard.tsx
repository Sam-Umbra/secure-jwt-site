import { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <Header auth={isAuthenticated}/>
      <main>
        
      </main>
      <Footer />
    </>
  );
}
