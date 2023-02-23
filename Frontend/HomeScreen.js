import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const [isLoading, setisLoading] = useState(false);
  const [result, setResult] = useState("");
  const [image, setImage] = useState();
  const [type, setType] = useState();
  const [base64, setBase64] = useState();

  useEffect(() => {
    if (image) {
      navigation.navigate("Result", {
        type: type,
        base64: base64,
        image: image,
      });
    }
  }, [image]);
  const pickFile = async () => {
    setResult("");
    setImage(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (!result.canceled) {
      setBase64(result.assets[0].base64);
      setType(result.assets[0].type);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#6560D7", "#6987F0"]} style={styles.topScreen}>
        <PieChart
          data={[
            {
              name: "Calories",
              value: 318,
              color: "red",
              legendFontColor: "#fff",
              legendFontSize: 15,
            },
            {
              name: "Fats",
              value: 17.9,
              color: "green",
              legendFontColor: "#fff",
              legendFontSize: 15,
            },
            {
              name: "Carbs",
              value: 40,
              color: "orange",
              legendFontColor: "#fff",
              legendFontSize: 15,
            },
            {
              name: "Protiens",
              value: 6,
              color: "blue",
              legendFontColor: "#fff",
              legendFontSize: 15,
            },
          ]}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
        //  absolute //for the absolute number remove if you want percentage
        />
      </LinearGradient>

      <View style={styles.bottomScreen}>
        <Text style={styles.textStyle}>Calculate food nutritions</Text>
        <Image
          source={require("../assets/ProjectImages/homeScreenImg3.png")}
          style={styles.imgStyle}
        />
        <View style={styles.buttonView}>
          <LinearGradient
            style={styles.btnStyle}
            colors={["#6560D7", "#6987F0"]}
          >
            <Text
              style={styles.btnTextStyle}
              onPress={() => console.log("Pressed")}
            >
              Camera
            </Text>
          </LinearGradient>
          <LinearGradient
            style={styles.btnStyle}
            colors={["#6560D7", "#6987F0"]}
          >
            <Text
              style={styles.btnTextStyle}
              onPress={() => {
                pickFile();
              }}
            >
              Gallery
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  topScreen: {
    flex: 2,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  bottomScreen: {
    backgroundColor: "#fff",
    flex: 2,
    marginTop: 20,
  },
  textStyle: {
    color: "#534FB0",
    fontWeight: "bold",
    paddingLeft: 20,
    fontSize: 20,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnStyle: {
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },
  btnTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    padding: 7,
  },
  imgStyle: {
    width: 400,
    height: 200,
    alignSelf: "center",
  },
});
