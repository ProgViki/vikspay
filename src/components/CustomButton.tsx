import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
};

export default function CustomButton({
  label,
  onPress,
  loading = false,
}: Props) {
  return (
    <TouchableOpacity
      disabled={loading}
      style={[styles.button, loading && styles.disabled]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0A96CC",
    borderRadius: 75,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },

  label: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 16,
  },

  disabled: { opacity: 0.7 },
});
