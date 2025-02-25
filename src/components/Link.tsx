import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { LinkProps, Link as RouterLink } from "expo-router";

type Props = {
  label: string;
  href: LinkProps["href"];
  linkStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export default function Link({ label, href, linkStyle, labelStyle }: Props) {
  return (
    <RouterLink style={linkStyle} href={href}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </RouterLink>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 600,
    fontSize: 14,
    color: "#0A96CC",
    marginTop: 2,
  },
});
