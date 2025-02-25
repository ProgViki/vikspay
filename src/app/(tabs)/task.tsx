import { HomeConnStatus } from "@/src/api/types/types";
import CustomLabel from "@/src/components/CustomLabel";
import CustomTextInput from "@/src/components/CustomTextInput.tsx";
import LoadingScreen from "@/src/components/LoadingScreen";
import EscalateTicketModal from "@/src/components/modals/EscalateTicketModal";
import ResolveTicketModal from "@/src/components/modals/ResolveTicketModal";
import StatusTag from "@/src/components/tags/StatusTags";
import TaskDetailCard from "@/src/components/TaskDetailCard";
import { ticketStatus } from "@/src/hooks/useTicketsStatus";
import { formItems } from "@/src/utils/data";
import useOrderedPredefinedTasks from "@/src/utils/sortTasks";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Task = () => {
  const [resolveTaskIsOpen, setResolveTaskIsOpen] = useState(false);
  const [escalateTaskIsOpen, setEscalateTaskIsOpen] = useState(false);
  const [_formData, setFormData] = useState({});

  const {
    orderedTasks: tasks,
    isFetching,
    isLoading,
    ticket,
  } = useOrderedPredefinedTasks();

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  const handleEquipmentInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const dropdownOptions = [
  //   {
  //     label: "Resolve",
  //     icon: "check-circle",
  //     onPress: () => setResolveTaskIsOpen(true),
  //     color: "green",
  //   },
  //   {
  //     label: "Escalate",
  //     icon: "arrow-up",
  //     onPress: () => setEscalateTaskIsOpen(true),
  //     color: "red",
  //   },
  // ];

  const verifyTaskHasBeenCompleted = (id: string): boolean => {
    const getTask = tasks?.find((item) => item.id === id);

    if (!getTask) return false;

    return ticketStatus(getTask.status as HomeConnStatus) !== "ongoing";
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Breadcrumbs /> */}
      <View style={styles.container}>
        <View style={styles.heading}>
          <View style={styles.headingWrapper}>
            <Text style={styles.subject}>{ticket?.estateName}</Text>
            {/* {ticketStatus(ticket?.status) === "ongoing" ? (s
              <CustomDropdown options={dropdownOptions} />
            ) : (
              <StatusTag status={ticket?.status as HomeConnStatus} />
            )} */}

            <StatusTag status={ticket?.status as HomeConnStatus} />
          </View>
          <Text style={styles.description}>{ticket?.address}</Text>
          <Text style={styles.note}>
            All fields marked with aestericks (
            <Text style={{ color: "red" }}>*</Text>) are required
          </Text>
        </View>

        <View style={styles.tasksWrapper}>
          {tasks?.map((task, index) => (
            <View style={styles.taskWrapper} key={task.id}>
              <View style={styles.stepIconWrapper}>
                {index !== (tasks?.length ?? 0) - 1 && (
                  <View
                    style={[
                      styles.iconBorder,
                      {
                        borderColor:
                          ticketStatus(task.status as HomeConnStatus) ===
                          "ongoing"
                            ? "lightgray"
                            : "green",
                      },
                    ]}
                  ></View>
                )}
                <View
                  style={[
                    styles.stepIcon,
                    !verifyTaskHasBeenCompleted(task.id) && styles.ongoingStyle,
                  ]}
                >
                  <Feather
                    name={
                      !verifyTaskHasBeenCompleted(task.id)
                        ? "clock"
                        : "check-circle"
                    }
                    size={14}
                    color={"#fff"}
                  />
                </View>
              </View>

              <View
                style={{
                  width: "90%",
                }}
              >
                <TaskDetailCard
                  index={index}
                  key={task.id}
                  task={task}
                  tasks={tasks ?? []}
                  ticketId={ticket?.id!}
                />
              </View>
            </View>
          ))}
        </View>

        {ticketStatus(ticket?.status) === "ongoing" ? (
          <View style={styles.equipmentFormWrapper}>
            <View style={styles.formTitleWrapper}>
              <Text style={styles.formTitle}>Fill in the details below</Text>
            </View>
            <View style={styles.equipmentForm}>
              {formItems.map((item, index) => (
                <View key={index} style={styles.formGroup}>
                  <CustomLabel label={item.label} />
                  <CustomTextInput
                    keyboardType={
                      item.type === "number" ? "numeric" : "default"
                    }
                    handleChange={(event) =>
                      handleEquipmentInputChange(
                        item.name,
                        event.nativeEvent.text
                      )
                    }
                  />
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {ticketStatus(ticket?.status) === "ongoing" ? (
          <TouchableOpacity
            onPress={() => setResolveTaskIsOpen(true)}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Submit Ticket</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <ResolveTicketModal
        data={ticket}
        isOpen={resolveTaskIsOpen}
        setIsOpen={setResolveTaskIsOpen}
      />

      <EscalateTicketModal
        data={ticket}
        isOpen={escalateTaskIsOpen}
        setIsOpen={setEscalateTaskIsOpen}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: 6,
    paddingTop: 12,
    paddingBottom: 50,
    backgroundColor: "#FAFCFB",
    // gap: 20,
  },

  heading: {
    display: "flex",
    gap: 4,
  },

  headingWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  subject: {
    fontSize: 20,
    fontWeight: 700,
    textTransform: "capitalize",
    maxWidth: "70%",
  },

  description: {
    fontSize: 14,
    color: "gray",
  },

  note: {
    marginTop: 8,
    color: "gray",
    fontSize: 12,
  },

  tasksWrapper: {
    marginTop: 24,
  },

  taskWrapper: {
    flexDirection: "row",
    gap: 10,
  },

  iconBorder: {
    position: "absolute",
    top: 2,
    width: 0,
    height: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  stepIconWrapper: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  ongoingStyle: {
    backgroundColor: "lightgray",
  },

  stepIcon: {
    borderRadius: 50,
    backgroundColor: "#009E00",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  btn: {
    backgroundColor: "#0A96CC",
    padding: 12,
    borderRadius: 50,
    marginTop: 30,
  },

  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: 700,
  },

  formTitleWrapper: {},

  formTitle: {
    fontWeight: 700,
  },

  equipmentFormWrapper: {
    gap: 10,
    borderBlockColor: "#fff",
  },

  equipmentForm: {
    gap: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    paddingInline: 10,
    paddingBlock: 10,
  },

  formGroup: {
    gap: 4,
    width: "48%",
  },
});

export default Task;
