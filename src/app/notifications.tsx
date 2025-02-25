import { useGetTicketsQuery } from "@/src/api/services/taskApi";
import { Ticket } from "@/src/api/types/types";
import LoadingScreen from "@/src/components/LoadingScreen";
import NotificationCard from "@/src/components/NotificationCard";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Notifications = () => {
    const [currentTab, setCurrentTab] = useState<number>(1);
    const [filteredData, setFilteredData] = useState<Ticket[] | null>(null);
    const [readNotifications, setReadNotifications] = useState<string[]>([]);

    const { data: tickets, isLoading, isFetching } = useGetTicketsQuery();

    useEffect(() => {
        const loadReadNotifications = async () => {
            const storedRead = await AsyncStorage.getItem("readNotifications");
            if (storedRead) {
                setReadNotifications(JSON.parse(storedRead));
            }
        };
        loadReadNotifications();
    }, []);

    useEffect(() => {
        let data: Ticket[] = [];

        switch (currentTab) {
            case 1: // All notifications
                data = tickets ?? [];
                break;
            case 2: // Unread notifications
                data = tickets?.filter((item) => !readNotifications.includes(item.ticketId)) ?? [];
                break;
            case 3: // Read notifications
                data = tickets?.filter((item) => readNotifications.includes(item.ticketId)) ?? [];
                break;
            default:
                data = tickets ?? [];
        }

        setFilteredData(data);
    }, [tickets, currentTab, readNotifications]);

    const markAsRead = async (ticketId: string) => {
        const updatedRead = [...readNotifications, ticketId];
        setReadNotifications(updatedRead);
        await AsyncStorage.setItem("readNotifications", JSON.stringify(updatedRead));
    };

    const tabs = [
        { id: 1, label: "All", count: tickets?.length ?? 0 },
        { id: 2, label: "Unread", count: tickets?.filter((item) => !readNotifications.includes(item.ticketId)).length ?? 0 },
        { id: 3, label: "Read", count: tickets?.filter((item) => readNotifications.includes(item.ticketId)).length ?? 0 },
    ];

    if (isLoading || isFetching) {
        return <LoadingScreen isLoading={isLoading || isFetching} />;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tabsWrapper}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        onPress={() => setCurrentTab(tab.id)}
                        style={[
                            styles.tab,
                            { borderRightWidth: index === tabs.length - 1 ? 0 : 1 },
                            { backgroundColor: currentTab === tab.id ? "#0a96cc" : "transparent" },
                        ]}
                        key={tab.id}
                    >
                        <Text style={[styles.tabText, { color: currentTab === tab.id ? "#fff" : "gray", fontWeight: currentTab === tab.id ? "700" : "500" }]}>
                            {tab.label} ({tab.count})
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.notificationsWrapper}>
        {filteredData?.map((item) => (
          <NotificationCard
            key={item.id}
            taskId={item.ticketId} // ✅ Matching `NotificationCard` props
            title={item.subject}
            time={item.createdAt}
            description={item.description}
          />
        ))}
      </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
        paddingTop: 24,
        paddingBottom: 50,
        backgroundColor: "#FAFCFB",
    },
    tabsWrapper: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 24,
    },
    tab: {
        flexBasis: "34%",
        borderRightColor: "lightgray",
        borderRightWidth: 1,
        paddingVertical: 10,
    },
    tabText: {
        textAlign: "center",
        fontSize: 15,
    },
    tasksWrapper: {},
});

export default Notifications;


export const dummyNotifications = [
    {
      id: "1",
      ticketId: "TKT-001",
      subject: "Server Downtime Alert",
      description: "The main server is down due to unexpected errors.",
      createdAt: "2024-02-18T10:30:00Z",
      status: "Ongoing",
    },
    {
      id: "2",
      ticketId: "TKT-002",
      subject: "Password Reset Request",
      description: "User requested a password reset for their account.",
      createdAt: "2024-02-17T14:00:00Z",
      status: "Completed",
    },
    {
      id: "3",
      ticketId: "TKT-003",
      subject: "Software Update Available",
      description: "A new security patch is available for the system.",
      createdAt: "2024-02-16T08:15:00Z",
      status: "Ongoing",
    },
    {
      id: "4",
      ticketId: "TKT-004",
      subject: "Bug Report: UI Issue",
      description: "Users reported an issue with the login button alignment.",
      createdAt: "2024-02-15T16:45:00Z",
      status: "Completed",
    },
    {
      id: "5",
      ticketId: "TKT-005",
      subject: "New Feature Request",
      description: "A customer requested a dark mode option for better UX.",
      createdAt: "2024-02-14T12:20:00Z",
      status: "Ongoing",
    },
  ];
  