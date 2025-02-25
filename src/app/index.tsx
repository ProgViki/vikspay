import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { reroute } from "../utils/reroute";

const WelcomeScreen = () => {
  const router = useRouter();

  // useEffect(() => {
  //   reroute();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.topCont}>
          <Image
            source={require("../../assets/images/logo-field.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/Welcome.png")}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.topConts}>
          <Text style={styles.textHeadings}>INCIDENT & TICKETING </Text>
          <Text style={styles.textHeading}>Customer Support Made Easy</Text>
          <Text style={styles.text}>
            Simplify support with a ticketing system that prioritizes and
            resolves issues swiftly.
          </Text>
        </View>
        <View>
          {/* <Text style={styles.text}>Welcome to our app!</Text> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/auth/login")}
          >
            {" "}
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingInline: 10,
  },
  topCont: {
    flex: 0.2,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 40,
  },

  text: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 2,
  },
  textHeader: {
    fontSize: 14,
    fontWeight: "bold",
  },
  logo: {
    height: 30,
    width: 110,
    resizeMode: "cover",
    marginHorizontal: 0,
    top: 70,
  },
  imageContainer: {
    flex: 0.4,
    width: 320,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  topConts: {
    flex: 0.3,
    margin: 0,
    padding: 0,
    borderRadius: 10,
    // marginBottom: 20,
  },

  textHeadings: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    padding: 6,
    backgroundColor: "#FF66001F",
    borderRadius: 10,
    color: "#FF6600",
    marginHorizontal: 50,
  },
  textHeading: {
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0A96CC",
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 30,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
