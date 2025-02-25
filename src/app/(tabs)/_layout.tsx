import React from "react";
import { Tabs } from "expo-router";
import Notification from "@/src/components/Notification";
import { Ionicons } from "@expo/vector-icons"; // Correct import
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router"; // Corrected useNavigation import

// Define the IconName type with possible Ionicons names
type IconName =
  | "home"
  | "home-outline"
  | "list"
  | "list-outline"
  | "person"
  | "person-outline"
  | "grid"
  | "grid-outline";

const HeaderRight = () => {
  return (
    <TouchableOpacity style={{ marginRight: 15 }}>
      <Notification />
    </TouchableOpacity>
  );
};

// HeaderLeft component to handle back navigation
const HeaderLeft = () => {
  const navigation = useNavigation(); // Get navigation inside the component

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="arrow-back" size={24} color="#83838B" />
    </TouchableOpacity>
  );
};

// TabBarIcon component to render icons dynamically
const TabBarIcon = ({
  name,
  color,
  focused,
}: {
  name: IconName;
  color: string;
  focused: boolean;
}) => {
  // Define the mapping for focused and unfocused states
  const iconMap: Record<IconName, IconName> = {
    home: "home-outline",
    "home-outline": "home",
    list: "list-outline",
    "list-outline": "list",
    person: "person-outline",
    "person-outline": "person",
    grid: "grid-outline",
    "grid-outline": "grid",
  };

  return (
    <Ionicons name={focused ? name : iconMap[name]} color={color} size={24} />
  );
};

// Main Tab Layout component
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0A96CC",
        headerStyle: { backgroundColor: "#fff" },
        headerShadowVisible: false,
        headerTintColor: "#000",
        headerTitleAlign: "center",
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarInactiveTintColor: "#888",
        headerLeft: () => <HeaderLeft />, // Directly render HeaderLeft
        headerRight: () => <HeaderRight />,
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        }}
      />

      {/* Task Screen */}
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Task",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="list" color={color} focused={focused} />
          ),
        }}
      />

      {/* Profile Screen */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="person" color={color} focused={focused} />
          ),
        }}
      />

      {/* More Screen */}
      <Tabs.Screen
        name="task"
        options={{
          title: "More",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="grid" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
