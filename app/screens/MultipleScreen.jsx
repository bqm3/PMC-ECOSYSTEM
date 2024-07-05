import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import adjust from "../constants/adjust";
import ThemeContext from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

const MultipleScreen = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);

  const [loaded, error] = useFonts({
    Sanfrancisco: require("../../assets/fonts/Sanfrancisco.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    // return null;
  }

  const apps = [
    {
      id: 1,
      name: "Checklist",
      navi: "Trang chính",
      logo: require("../../assets/images/logo_checklist.png"),
    },
    {
      id: 2,
      name: "Scan Qr",
      navi: "ScanScreen",
      logo: require("../../assets/images/logo_scan.png"),
    },
  ];

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <BottomSheetModalProvider>
            <ImageBackground
              source={require("../../assets/images/PMCEcosystemBg2.png")}
              resizeMode="cover"
              style={styles.defaultFlex}
            >
              <ScrollView contentContainerStyle={[styles.container]}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    style={{
                      width: adjust(140),
                      height: adjust(80),
                      resizeMode: "contain",
                    }}
                    source={require("../../assets/images/pmc_logo.png")}
                  />
                  <Text style={styles.title}>OUR ECOSYSTEM</Text>
                </View>
                <View style={styles.card}>
                  <View style={styles.gridContainer}>
                    {apps.map((item) => (
                      <View key={item.id} style={styles.item}>
                        <TouchableOpacity
                          style={styles.itemContent}
                          onPress={() => navigation.navigate(item.navi)}
                        >
                          <View
                            style={{
                              backgroundColor: "white",
                              borderRadius: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              height: adjust(64),
                              width: adjust(64),
                              marginTop: 20,
                            }}
                          >
                            <Image
                              style={{
                                width: item.id === 2 ? adjust(65) : adjust(60),
                                height: item.id === 2 ? adjust(65) : adjust(60),
                                borderRadius: 20,
                                resizeMode: "contain",
                              }}
                              source={item.logo}
                            />
                          </View>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontSize: adjust(12),
                              color: "white",
                              paddingTop: 4,
                              fontWeight: "600",
                              textShadowColor: "rgba(0, 0, 0, 0.5)",
                              textShadowOffset: { width: -1, height: 0 },
                              textShadowRadius: 2,
                            }}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                <View></View>
              </ScrollView>
            </ImageBackground>
          </BottomSheetModalProvider>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </>
  );
};

export default MultipleScreen;

const styles = StyleSheet.create({
  defaultFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 120,
  },
  title: {
    fontFamily: "Sanfrancisco",
    fontSize: adjust(25),
    paddingTop: 20,
    color: "white",
  },
  card: {
    height: adjust(310),
    width: adjust(310),
    borderRadius: 20,
    shadowColor: "#000",
    zIndex: 0,
    backgroundColor: "rgba(255, 255, 255, .3)",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    width: "90%",
    height: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "33%",
    height: "auto",
    padding: 4,
  },
  itemContent: {
    height: adjust(80),
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 4,
  },
});
