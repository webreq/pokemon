import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import Card from "./components/Card";
import CardDetails from "./components/CardDetails";
import store from "./features/store";

const App = ()=>{
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Card} options={{headerShown:false}} />
          <Stack.Screen name="Pokemon" component={CardDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default App;
