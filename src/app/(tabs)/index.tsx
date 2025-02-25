// Home.tsx (or Home.js)
import {
  useGetAuthUserQuery,
  useListHomeConnQuery,
} from "@/src/api/services/taskApi"; // Importing the new hook
import { HomeConnStatus } from "@/src/api/types/types";
import LoadingScreen from "@/src/components/LoadingScreen";
import Location from "@/src/components/Location";
import NoTask from "@/src/components/NoTask";
import SummaryCard from "@/src/components/SummaryCard";
import TaskCard from "@/src/components/TaskCard";
import { ticketStatus } from "@/src/hooks/useTicketsStatus";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface FTTHMappedData {
  id: string;
  jobId: string;
  estateName: string;
  estateAddress: string;
  time: string | Date;
  status: HomeConnStatus;
}

const Home = () => {
  const { data: userData } = useGetAuthUserQuery();
  const {
    data: ftthData,
    isFetching: fetchingFTTHData,
    refetch: refetchFTTHData,
  } = useListHomeConnQuery(); // Fetch pending tasks
  const userFirstName = userData?.staff?.name.split(" ")[1] || "User";

  const summaryData = [
    {
      label: "Total",
      count: ftthData?.length,
    },
    {
      label: "Ongoing",
      count: ftthData?.filter((item) => ticketStatus(item.status) === "ongoing")
        .length,
    },
    {
      label: "Completed",
      count: ftthData?.filter((item) => ticketStatus(item.status) !== "ongoing")
        .length,
    },
  ];

  const ftthTicketsData = ftthData?.map((ticket) => ({
    id: ticket.id,
    jobId: ticket.jobId,
    title: ticket.estateName,
    time: ticket.createdAt,
    status: ticket.status,
    estateName: ticket.estateName,
    estateAddress: ticket.address,
  }));

  // UseState with explicit typing

  const [filterOption, setFilterOption] = useState("Total");
  const [filteredTickets, setFilteredTickets] = useState<FTTHMappedData[]>([]);

  useEffect(() => {
    if (filterOption) {
      switch (filterOption) {
        case "Total":
          setFilteredTickets(ftthTicketsData ?? []);
          break;
        case "Ongoing":
          setFilteredTickets(
            ftthTicketsData?.filter(
              (item) =>
                ticketStatus(item.status as HomeConnStatus) === "ongoing"
            ) ?? []
          );
          break;
        case "Completed":
          setFilteredTickets(
            ftthTicketsData?.filter(
              (item) =>
                ticketStatus(item.status as HomeConnStatus) !== "ongoing"
            ) ?? []
          );
          break;
        default:
          setFilteredTickets(ftthTicketsData ?? []);
          break;
      }
    } else setFilteredTickets(ftthTicketsData ?? []);
  }, [filterOption, ftthData]);

  const renderTask = ({ item }: { item: FTTHMappedData }) => (
    <TaskCard {...item} />
  );

  return (
    <ScrollView style={styles.container}>
      {fetchingFTTHData ? (
        <View
          style={{
            marginTop: "70%",
          }}
        >
          <LoadingScreen />
        </View>
      ) : (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>
              Welcome <Text style={{ color: "#0a7ea4" }}>{userFirstName},</Text>
            </Text>
          </View>
          <Location />

          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={styles.sectionTitle}>
                {filterOption} Tickets ({filteredTickets.length ?? 0})
              </Text>
              <TouchableOpacity
                onPress={refetchFTTHData}
                style={{
                  paddingHorizontal: 14,
                  height: 28,
                  backgroundColor: "#0A96CC",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.refreshContent}>
                  <Feather name="refresh-cw" size={12} color="#fff" />
                  <Text style={styles.refreshText}>Refresh</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.summaryCardsWrapper}>
              {summaryData.map((item) => (
                <SummaryCard
                  label={item.label}
                  count={item.count ?? 0}
                  setFilterOption={setFilterOption}
                />
              ))}
            </View>

            {ftthTicketsData && ftthTicketsData.length === 0 ? (
              <NoTask />
            ) : (
              <FlatList
                data={filteredTickets}
                renderItem={renderTask}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  summaryCardsWrapper: {
    flexDirection: "row",
    gap: 4,
    flexBasis: "100%",
    paddingInline: 2,
  },
  refreshContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  refreshText: {
    marginLeft: 2,
    fontSize: 14,
    color: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  refreshButton: { padding: 10, borderRadius: 50, backgroundColor: "#0A96CC" },

  container: { flex: 1, padding: 10, backgroundColor: "#FAFCFB" },

  welcomeText: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 10 },
  headerTags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dropdownMenu: {
    padding: 10,
    backgroundColor: "white",
    position: "absolute",
    right: 20,
    top: 140,
  },
  dropdownItem: { fontSize: 16, padding: 10 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#0A96CC",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Home;
