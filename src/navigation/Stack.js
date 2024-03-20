import {createStackNavigator} from '@react-navigation/stack';
import SignInRider from '../screens/AuthRider/SignInRider';
import ForgetPasswordRider from '../screens/AuthRider/ForgetPasswordRider';
import Delivery from '../screens/Rider/Delivery';
import ShippingDetailsRider from '../screens/Rider/ShippingDetailsRider';
import CustomerServiceRider from '../screens/Rider/CustomerServiceRider';
import CompleteRider from '../screens/Rider/CompleteRider';
import OrderCancelRider from '../screens/Rider/OrderCancelRider';
import CancelRider from '../screens/Rider/CancelRider';
import Intro1 from '../screens/Rider/Intro1';
import Intro2 from '../screens/Rider/Intro2';

{
  /* <MainStack.Navigator screenOptions={{headerShown: false}}>
<MainStack.Screen name="Intro1" component={Intro1} />
<MainStack.Screen name="Intro2" component={Intro2} />

<MainStack.Screen
  name="ForgetPasswordRider"
  component={ForgetPasswordRider}
/>
<MainStack.Screen name="SignInRider" component={SignInRider} />

<MainStack.Screen name="Delivery" component={Delivery} />
<MainStack.Screen
  name="ShippingDetailsRider"
  component={ShippingDetailsRider}
/>
<MainStack.Screen
  name="CustomerServiceRider"
  component={CustomerServiceRider}
/>
<MainStack.Screen name="CompleteRider" component={CompleteRider} />
<MainStack.Screen
  name="OrderCancelRider"
  component={OrderCancelRider}
/>
<MainStack.Screen name="CancelRider" component={CancelRider} />
</MainStack.Navigator> */
}
const IntroStack = createStackNavigator();
const IntroScreens = () => {
  return (
    <IntroStack.Navigator screenOptions={{headerShown: false}}>
      <IntroStack.Screen name="Intro1" component={Intro1} />
      <IntroStack.Screen name="Intro2" component={Intro2} />
    </IntroStack.Navigator>
  );
};
const AuthStack = createStackNavigator();
const AuthScreens = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {/* <AuthStack.Screen name="Intro1" component={Intro1} />
      <AuthStack.Screen name="Intro2" component={Intro2} /> */}
      <AuthStack.Screen name="SignInRider" component={SignInRider} />
      <AuthStack.Screen
        name="ForgetPasswordRider"
        component={ForgetPasswordRider}
      />
    </AuthStack.Navigator>
  );
};

const AppDeliveryStack = createStackNavigator();

const AppDelivery = () => {
  return (
    <AppDeliveryStack.Navigator screenOptions={{headerShown: false}}>
      <>
        <AppDeliveryStack.Screen name="Delivery" component={Delivery} />
        <AppDeliveryStack.Screen
          name="ShippingDetailsRider"
          component={ShippingDetailsRider}
        />
        <AppDeliveryStack.Screen
          name="CustomerServiceRider"
          component={CustomerServiceRider}
        />
        <AppDeliveryStack.Screen
          name="CompleteRider"
          component={CompleteRider}
        />
        <AppDeliveryStack.Screen
          name="OrderCancelRider"
          component={OrderCancelRider}
        />
        <AppDeliveryStack.Screen name="CancelRider" component={CancelRider} />
      </>
    </AppDeliveryStack.Navigator>
  );
};
export {AuthScreens, AppDelivery, IntroScreens};
