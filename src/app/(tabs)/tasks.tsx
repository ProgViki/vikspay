import {
  useGetTicketsQuery,
  useListHomeConnQuery,
} from "@/src/api/services/taskApi";
import { HomeConn, HomeConnStatus } from "@/src/api/types/types";
import LoadingScreen from "@/src/components/LoadingScreen";
import TaskCard from "@/src/components/TaskCard";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Tasks = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<HomeConn[] | null>(null);

  const { data: tickets, isLoading, isFetching } = useListHomeConnQuery();

  useEffect(() => {
    let data: HomeConn[] = [];

    switch (currentTab) {
      case 1:
        data = tickets ?? [];
        break;
      case 2:
        data =
          tickets?.filter(
            (item) =>
              item.status !== HomeConnStatus.CLOSED &&
              item.status !== HomeConnStatus.RESOLVED
          ) ?? [];
        break;
      case 3:
        data =
          tickets?.filter(
            (item) =>
              item.status === HomeConnStatus.CLOSED ||
              item.status === HomeConnStatus.RESOLVED
          ) ?? [];
        break;
      default:
        data = tickets ?? [];
    }

    setFilteredData(data);
  }, [tickets, currentTab]);

  const tabs = [
    {
      id: 1,
      label: "All",
      count: tickets?.length ?? 0,
    },
    {
      id: 2,
      label: "Ongoing",
      count:
        tickets?.filter(
          (item) =>
            item.status !== HomeConnStatus.CLOSED &&
            item.status !== HomeConnStatus.RESOLVED
        ).length ?? 0,
    },
    {
      id: 3,
      label: "Completed",
      count:
        tickets?.filter(
          (item) =>
            item.status === HomeConnStatus.CLOSED ||
            item.status === HomeConnStatus.RESOLVED
        ).length ?? 0,
    },
  ];

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabsWrapper}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            onPress={() => {
              setCurrentTab(tab.id);
            }}
            style={[
              styles.tab,
              { borderRightWidth: index === tabs.length - 1 ? 0 : 1 },
              {
                backgroundColor:
                  currentTab === tab.id ? "#0a96cc" : "transparent",
              },
            ]}
            key={tab.id}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: currentTab === tab.id ? "#fff" : "gray",
                },
                {
                  fontWeight: currentTab === tab.id ? 700 : 500,
                },
              ]}
            >
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tasksWrapper}>
        {filteredData?.map((item) => (
          <TaskCard
            id={item.id}
            time={item.createdAt}
            status={item.status as HomeConnStatus}
            jobId={item.jobId}
            estateName={item.estateName}
            estateAddress={item.address}
            key={item.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: 6,
    paddingTop: 24,
    paddingBottom: 50,
    backgroundColor: "#FAFCFB",
    // gap: 20,
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
    paddingBlock: 10,
    backgroundColor: "transparent",
  },

  tabText: {
    textAlign: "center",
    color: "gray",
    fontSize: 15,
  },

  tasksWrapper: {},
});

export default Tasks;
