import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

interface SubmitTaskModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const SubmitTaskModal: React.FC<SubmitTaskModalProps> = ({ isVisible, onCancel, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Confirm Submission</Text>
        <Text style={styles.modalText}>Are you sure you want to submit this task?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, color: "#555", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: { color: "#333", fontSize: 16, fontWeight: "bold" },
  confirmButton: {
    backgroundColor: "#0A96CC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default SubmitTaskModal;
