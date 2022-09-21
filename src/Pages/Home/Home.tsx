import {useContext} from 'react'
import { UserContext } from "../../Context/userContext";
import HomeDisconnected from '../../Components/Home/HomeDisconnected/homeDisconnected';
const Home = () => {
  const { currentUser } = useContext(UserContext);

    return(
      <>{!currentUser && <HomeDisconnected />}</>
    )
}

export default Home