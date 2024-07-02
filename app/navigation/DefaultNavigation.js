import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import ScanScreen from "../screens/QrScan/ScanScreen";
import MultipleScreen from "../screens/MultipleScreen";


const Stack = createNativeStackNavigator();

const DefaultNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="ScanScreen"
          component={ScanScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default DefaultNavigation;

