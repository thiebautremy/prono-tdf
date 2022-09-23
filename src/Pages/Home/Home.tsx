import React, {useContext} from 'react'
import { UserContext } from "../../Context/userContext";
import HomeDisconnected from '../../Components/Home/HomeDisconnected/homeDisconnected';
import HomeConnected from '../../Components/Home/HomeConnected/homeConnected';
const Home = () => {
  const { currentUser } = useContext(UserContext);

    return(
      <>{currentUser ? <HomeConnected /> : <HomeDisconnected />}</>
    )
}

export default Home