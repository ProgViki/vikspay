import React, { useEffect, useState } from "react";
import { ViewStyle, TextStyle } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";

const LocationComponent = (props: {
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  iconSize?: number;
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationEnabled = await Location.hasServicesEnabledAsync();
      if (!locationEnabled) {
        setErrorMsg("Location services are not enabled");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { street, city, subregion, region, country } = reverseGeocode[0];

        setAddress(`${street}, ${city}, ${subregion}, ${region}, ${country}`);
      }
    })();
  }, []);

  let text = "Loading location...";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = address;
  } else if (location) {
    text = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Feather name="map-pin" color={"#40b554"} size={props.iconSize ?? 12} />
      <Text style={[styles.paragraph, props.textStyle]}>{text}.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 2,
    paddingInline: 10,
    borderRadius: 50,
    gap: 4,
    alignSelf: "flex-start",
    marginTop: -5,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 11,
    textAlign: "left",
    color: "gray",
  },
});

export default LocationComponent;
