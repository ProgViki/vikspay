import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Breadcrumbs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routes = navigation.getState()?.routes || [];

  return (
    <View style={styles.container}>
      {routes.map((r, index) => (
        <TouchableOpacity
          key={r.name}
          onPress={() => navigation.navigate(r.name as never)}
          disabled={route.name === r.name} // Disable current screen
        >
          <Text style={[styles.text, route.name === r.name && styles.active]}>
            {r.name}
          </Text>
          {index < routes.length - 1 && (
            <Text style={styles.separator}> / </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
  active: {
    fontWeight: "bold",
    color: "#000",
  },
  separator: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});

export default Breadcrumbs;
