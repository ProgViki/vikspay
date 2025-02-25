import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import {
  Task,
  taskDataOne,
  taskDataTwo,
  taskDataThree,
  taskDataFour,
  taskDataFive,
  taskDataSix,
} from "@/src/components/TaskData";

type UploadedFile = {
  name: string;
  uri: string;
  type: string;
  title?: string; // Optional field
};

// ✅ Component for handling file upload logic
const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled || !result.assets?.length) return;

      setUploadedFile({
        name: result.assets[0].name || "Unknown file",
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType || "unknown",
      });
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  return { uploadedFile, handleFileUpload };
};

// ✅ Step Component (Reusable for each step)
const StepComponent = ({
  taskData,
  taskName,
  setTaskName,
  priority,
  setPriority,
  uploadedFile,
  handleFileUpload,
  nextStep,
}: {
  taskData: Task[];
  taskName: string;
  setTaskName: (text: string) => void;
  priority: string | null;
  setPriority: (value: string) => void;
  uploadedFile: UploadedFile | null;
  handleFileUpload: () => void;
  nextStep: () => void;
}) => (
  <View style={styles.stepContainer}>
    {taskData.map((task: Task) => (
      <View key={task.id}>
        <View style={styles.titleContainer}>
          <Text style={styles.titles}>{task.title}</Text>
          <Text style={styles.date}>{task.date}</Text>
          <Text style={styles.time}>{task.time}</Text>
        </View>
      </View>
    ))}

    <View style={styles.inputAndRadios}>
      <View style={styles.radioGroup}>
        {["No", "Yes"].map((level) => (
          <View key={level} style={styles.radioContainer}>
            <Text style={styles.radioLabel}>{level}</Text>
            <TouchableOpacity
              style={[
                styles.radioButton,
                priority === level && styles.radioButtonSelected,
              ]}
              onPress={() => setPriority(level)}
            />
          </View>
        ))}
      </View>

      <View>
        <Text style={styles.label}>Comment (Optional)</Text>
        <TextInput
          style={styles.input}
          value={taskName}
          multiline
          numberOfLines={4}
          onChangeText={setTaskName}
          placeholder="Enter comment..."
        />
      </View>
    </View>

    <Text style={styles.label}>Upload (Optional)</Text>
    <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
      <Text style={styles.uploadText}>
        Drop your Photos & Videos here or select from your computer
      </Text>
    </TouchableOpacity>
    {uploadedFile && <Text style={styles.fileName}>{uploadedFile.name}</Text>}

    <TouchableOpacity
      style={[
        styles.submitButton,
        (!taskName || !priority) && styles.submitButtonDisabled,
      ]}
      disabled={!taskName || !priority}
      onPress={nextStep}
    >
      <Text style={styles.submitButtonText}>Submit Task</Text>
    </TouchableOpacity>
  </View>
);

// ✅ Step Components (Each step uses StepComponent)
const StepOne = (props: any) => (
  <StepComponent taskData={taskDataOne} {...props} />
);
const StepTwo = (props: any) => (
  <StepComponent taskData={taskDataTwo} {...props} />
);
const StepThree = (props: any) => (
  <StepComponent taskData={taskDataThree} {...props} />
);
const StepFour = (props: any) => (
  <StepComponent taskData={taskDataFour} {...props} />
);
const StepFive = (props: any) => (
  <StepComponent taskData={taskDataFive} {...props} />
);
const StepSix = (props: any) => (
  <StepComponent taskData={taskDataSix} {...props} />
);

// ✅ Task Completion Step
const TaskCompleted = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.title}>Task Completed</Text>
    <Text style={styles.description}>
      Congratulations! The task setup is complete.
    </Text>
  </View>
);

// ✅ Main Component
export default function TaskPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [taskName, setTaskName] = useState<string>("");
  const [priority, setPriority] = useState<string | null>(null);
  const { uploadedFile, handleFileUpload } = useFileUpload();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    <StepOne
      {...{
        taskName,
        setTaskName,
        priority,
        setPriority,
        uploadedFile,
        handleFileUpload,
        nextStep: () => setCurrentStep(1),
      }}
    />,
    <StepTwo
      {...{
        taskName,
        setTaskName,
        priority,
        setPriority,
        uploadedFile,
        handleFileUpload,
        nextStep: () => setCurrentStep(2),
      }}
    />,
    <StepThree
      {...{
        taskName,
        setTaskName,
        priority,
        setPriority,
        uploadedFile,
        handleFileUpload,
        nextStep: () => setCurrentStep(3),
      }}
    />,
    <StepFour
      {...{
        taskName,
        setTaskName,
        priority,
        setPriority,
        uploadedFile,
        handleFileUpload,
        nextStep: () => setCurrentStep(4),
      }}
    />,
    <StepFive
      {...{
        taskName,
        setTaskName,
        priority,
        setPriority,
        uploadedFile,
        handleFileUpload,
        nextStep: () => setCurrentStep(5),
      }}
    />,
    <StepSix
      {...{
        taskName,
        setTaskName,
        priority,
        setPriority,
        uploadedFile,
        handleFileUpload,
        nextStep: () => setCurrentStep(6),
      }}
    />,
    <TaskCompleted />,
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fibre Installation</Text>
      <Text style={styles.headerNotes}>
        Kindly follow the steps below to complete the task. Ensure you put on
        your location on your mobile device.
      </Text>

      <View style={styles.taskContainer}>
        <View style={styles.stepsContainer}>
          {steps.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentStep(index)}
              style={styles.stepIndicator}
            >
              <View
                style={[
                  styles.stepCircle,
                  currentStep === index && styles.stepCircleActive,
                ]}
              >
                <Text style={styles.stepText}>{index + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contentContainer}>{steps[currentStep]}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  taskContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    margin: 10,
    // marginBottom: 10,
  },
  headerNotes: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subtitle: {},
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    gap: 10,
  },
  titles: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    // width: '40%',
  },
  date: {
    color: "#000",
    fontSize: 12,
    // marginLeft: 10,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5,
  },
  time: {
    color: "#000",
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5,
    // marginLeft: 10,
  },
  stepsContainer: {
    width: "12%",
    paddingVertical: 20,
    // backgroundColor: '#fff',
  },
  stepIndicator: {
    alignItems: "center",
    marginBottom: 20,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  stepCircleActive: {
    backgroundColor: "#0A96CC",
  },
  stepText: {
    color: "#fff",
    fontWeight: "bold",
  },
  stepTitle: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  stepContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginVertical: 5,
  },
  inputAndRadios: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  radioGroup: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 2,
    gap: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 30,
    // marginVertical: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 15,
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    backgroundColor: "#0A96CC",
    borderColor: "#0A96CC",
  },
  radioLabel: {
    fontSize: 14,
    color: "#333",
  },

  radioSelected: {
    backgroundColor: "#0A96CC",
    borderColor: "#0A96CC",
  },
  radioText: {
    color: "#333",
    fontSize: 14,
  },
  radioTextSelected: {
    color: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
    marginRight: 10,
    width: "120%",
  },

  uploadButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 4,
    borderStyle: "dashed",
    borderWidth: 1,
    marginHorizontal: 10,
  },
  uploadText: {
    color: "#777",
    fontWeight: "bold",
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 14,
  },
  fileName: {
    fontSize: 12,
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#0A96CC",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonDisabled: {
    backgroundColor: "#0A96CC7a",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
