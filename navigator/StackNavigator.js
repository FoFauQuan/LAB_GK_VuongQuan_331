import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screen/Login";
import Register from "../screen/Register";
import Home from "../screen/Home";




const Stack = createStackNavigator()
const StackNavigator =()=>{
    return(
        <Stack.Navigator
        backBehavior="order">
            <Stack.Screen name ="Login" component={Login}
            options={{headerShown :false}}
            />
            <Stack.Screen name ="Register" component={Register}
            options={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#DABC9D'
                  },    
            }}
            />
            <Stack.Screen name ="Home" component={Home}
            options={{headerShown :false}}
            />
        </Stack.Navigator>
    )
}
export default StackNavigator;