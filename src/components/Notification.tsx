import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGetTicketsQuery } from "@/src/api/services/taskApi";
import * as Notifications from "expo-notifications";

const Notification = () => {
    const router = useRouter(); // Use Expo Router
    const { data, isLoading, isError } = useGetTicketsQuery();
    const [notifications, setNotifications] = useState<string[]>([]);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        if (data && !isLoading && !isError) {
            const createNotification = async () => {
                const ticket = Array.isArray(data) ? data[0] : data; 
                if (ticket?.ticketId) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: "New Ticket Update!",
                            body: `Ticket ${ticket.ticketId} has been updated.`,
                        },
                        trigger: null,
                    });

                    setNotifications((prev) => [`Ticket ${ticket.ticketId} has been updated.`, ...prev]);
                    setNotificationCount((prev) => prev + 1); // Increase count
                }
            };
            createNotification();
        }
    }, [data, isLoading, isError]);

    const handlePress = () => {
        router.push("/notifications"); // Navigate to the Notifications page
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={handlePress} style={styles.container}>
                <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
                {notificationCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{notificationCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ddd",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: -2,
        right: -2,
        backgroundColor: "#FF0000",
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "bold",
    },
});

export default Notification;
