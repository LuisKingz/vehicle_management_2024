
import { Navigation } from '../components/Navigation';
import { Tabs } from '../components/Tabs';
import { useAuth } from '../context/AuthContext';
function Home (){
  const { user } = useAuth();
  //console.log(user);
  return (
    <>
      <Navigation />
      <Tabs />
    </>
  )
}

export default Home;