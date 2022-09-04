import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseMutation,
} from "@react-firebase/database";
// import { firebaseConfig } from "../../config/firebaseConfig";
import firebase from "firebase/compat/app";
import CyclistCreator from "../CyclistCreator/cyclistCreator";
const App = () => {
  // console.log(firebaseConfig);
  console.log(firebase);
  console.log(firebase);
  return (
    <div className="App">
      {/* <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}> */}
      <p>bouh</p>
      <CyclistCreator />
      {/* </FirebaseDatabaseProvider> */}
    </div>
  );
};

export default App;
