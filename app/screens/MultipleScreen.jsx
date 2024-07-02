import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { Provider, useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { darkColors, lightColors } from "../constants/colors";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Checkbox from "../components/Checkbox/Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import adjust from "../constants/adjust";
import ButtonSubmit from "../components/Button/ButtonSubmit";
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

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <BottomSheetModalProvider>
            <ImageBackground
              source={require("../../assets/images/background_02.jpg")}
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
                    {Array.from({ length: 9 }, (_, index) => (
                      <View key={index} style={styles.item}>
                        <View style={styles.itemContent}>
                          <View
                            style={{
                              backgroundColor: "white",
                              borderRadius: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              height: adjust(64),
                              width: adjust(64),
                            }}
                          >
                            <Image
                              style={{
                                width: adjust(60),
                                height: adjust(60),
                                resizeMode: "contain",
                              }}
                              source={require("../../assets/images/icon.png")}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: adjust(12),
                              color: "white",
                              paddingTop: 4,
                              fontWeight: "600",
                            }}
                          >
                            Checklist
                          </Text>
                        </View>
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
  },
  gridContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  item: {
    width: "33%",
    height: "auto",
    padding: 4,
  },
  itemContent: {
    height: adjust(84),
    justifyContent: "center",
    alignItems: "center",
  },
});
