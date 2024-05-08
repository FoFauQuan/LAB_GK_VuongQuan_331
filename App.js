import 'react-native-gesture-handler'
import { MyContextControllerProvider } from "./src/Index";
import Register from "./screen/Register";
import Login from "./screen/Login";
import StackNavigator from "./navigator/StackNavigator";
import {NavigationContainer} from "@react-navigation/native"
import { PaperProvider } from "react-native-paper";



const App =()=>{
  return(
        <MyContextControllerProvider>
          <NavigationContainer>

              <StackNavigator/>
              
          </NavigationContainer>
        </MyContextControllerProvider>

  )
}
export default App;