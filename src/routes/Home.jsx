import { Navigation } from "../components/Navigation";
import { Tabs } from "../components/Tabs";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  return (
    <>
      <Navigation />
      <Tabs />
    </>
  );
};
