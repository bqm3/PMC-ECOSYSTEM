import { View, Text, useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ScanScreen from "../screens/QrScan/ScanScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SwitchTheme from "../screens/SwitchTheme";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { darkColors, lightColors } from "../constants/colors";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Home"
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
        component={ScanScreen}
      /> */}
      <Tab.Screen
        name="Profile"
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
        <Text>Custom Header</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert("Link to Help")} />
    </DrawerContentScrollView>
  );
}

function TabNavigation() {
  const dimensions = useWindowDimensions();
  const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      initialRouteName="Trang chủ"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Trang chủ"
        component={HomeTabs}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor:
              theme === "dark" ? darkColors.background : lightColors.background,
          },
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={SwitchTheme}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor:
              theme === "dark" ? darkColors.background : lightColors.background,
          },
          headerTitle: () => (
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: theme === "dark" ? darkColors.text : lightColors.text,
              }}
            >
              PMC
            </Text>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

export default TabNavigation;
