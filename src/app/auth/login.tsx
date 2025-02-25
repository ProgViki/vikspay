import { EMAIL_REGEX } from "@/src/api/constants";
import { useLoginMutation } from "@/src/api/services/taskApi";
import CustomButton from "@/src/components/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import Link from "@/src/components/Link";
import { toastApiError } from "@/src/utils/error.util";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const LoginScreen = () => {
  const { control, handleSubmit } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(true);

  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        Animated.timing(keyboardHeight, {
          toValue: event.endCoordinates.height - 20, // Moves up
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0, // Moves back down
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);


  function onLogin(data: any) {
    Toast.show({
      type: "info",
      text1: "Logging in...",
      text2: "Please wait",
      position: "top",
      visibilityTime: 0, // Keeps toast visible until it's manually hidden
      autoHide: false,
      bottomOffset: 80,
    });

    login(data)
      .unwrap()
      .then(async (res) => {
        await SecureStore.setItemAsync("token", res.token);
        await AsyncStorage.setItem("token", res.token);
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back!",
          position: "bottom",
        });
  
        router.replace("/(tabs)");
      })
      .catch((error) => {
        toastApiError(error);
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.message || "Something went wrong",
          position: "bottom",
        });
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Welcome! Get Started</Text>
              <Text style={styles.subtitle}>
                Fill in the information below to proceed
              </Text>

              <CustomInput
                name="email"
                label="Email"
                placeholder="Enter email address"
                keyboardType="email-address"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
                }}
              />

              <View style={styles.passwordWrapper}>
                <CustomInput
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  control={control}
                  secureTextEntry={showPassword}
                  rules={{ required: "Password is required" }}
                />
                <TouchableOpacity
                  style={{ position: "absolute" }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={{ marginTop: 20, marginRight: 20 }}>
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="lightgray"
                    />
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.forgotPasswordContainer}>
                <Link href="/auth/forgot-password" label="Forgot Password?" />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                loading={isLoading}
                label="Log in"
                onPress={handleSubmit(onLogin)}
              />
            </View>
          </ScrollView>
          <Toast />
        </KeyboardAvoidingView>
      </SafeAreaView>

    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  keyboardAvoidingView: {
    flex: 0.7,
    width: "100%",
  },
  scrollView: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#858985",
    marginBottom: 32,
    textAlign: "center",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  buttonContainer: {
    paddingInline: 20,
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 10,
  }
});

export default LoginScreen;