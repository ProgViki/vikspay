import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

interface DeleteDocumentModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteDocumentModal: React.FC<DeleteDocumentModalProps> = ({ isVisible, onCancel, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Confirm Deletion</Text>
        <Text style={styles.modalText}>Are you sure you want to delete this document?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Delete</Text>
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
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default DeleteDocumentModal;
