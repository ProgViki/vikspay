import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Authenticated User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          setError(true);
          return;
        }

        const response = await axios.get(
          "https://sm.api.miro.zoracom.com/auth/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.parentContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (error || !user) {
    return (
      <View style={styles.parentContainer}>
        <Text>Error loading user data</Text>
        {/* <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Text style={styles.actionText}>Log Out</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  const fullName = user?.staff?.name;

  // Function to generate initials from the full name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <View style={styles.parentContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{getInitials(fullName)}</Text>
            </View>
            <Text style={styles.username}>{fullName}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.customer}>{user?.customer}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLogout}
            >
              <Text style={styles.actionText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#d3d3d3",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    width: "90%",
    height: height * 0.8,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DAEFF7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  initialsText: {
    color: "#0A96CC",
    fontSize: 36,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  customer: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    top: 250,
    display: "flex",
    justifyContent: "center",
  },
  actionText: {
    color: "#A5A5A5",
    fontSize: 16,
    fontWeight: "bold",
  },
});
