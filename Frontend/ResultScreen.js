import { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Button,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Card, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";

export default function ResultScreen({ route, navigation }) {
  const [foodItem, setFoodItem] = useState();
  const [predictions, setPredictions] = useState();
  const { base64, type, image } = route.params;

  useEffect(() => {
    classify({
      type: type,
      base64: base64,
      uri: image,
    });
  });
  const classify = async (mediaFile) => {
    let type = mediaFile.type;
    let schema = "http://";
    let host = "192.168.1.105";
    let route = "/upload";
    let port = "5000";
    let url = "";
    let content_type = "image/jpeg";
    url = schema + host + ":" + port + route;
    console.log("URL:", url);
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    if (response) {
      console.log("response:", response.body);
      setFoodItem(response.body);
    }
    if (foodItem) {
      console.log("result:", foodItem);
    }
  };

  const calculateNutritions = async () => {
    let schema = "http://";
    let host = "192.168.1.105";
    let route = "/predict";
    let port = "5000";
    let url = "";
    url = schema + host + ":" + port + route;

    console.log("URL:", url);

    const formData = new FormData();
    formData.append("foodItem", foodItem);
    fetch(url, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((predictions) => {
        setPredictions(predictions);
        //console.log("prediction:",predictions[0]);
      });
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#6560D7", "#6987F0"]} style={styles.topScreen}>
        <Image source={{ uri: image }} style={styles.imgStyle} />
        {foodItem ? (
          <Text style={styles.foodItemStyle}>{foodItem}</Text>
        ) : (
          <ActivityIndicator size={
            "large"} />
        )}
      </LinearGradient>
      <View style={styles.bottomScreen}>
      
        {predictions ? (
          <View>
            <View style={styles.cardViewStyle}>
              <Card style={styles.cardStyle}>
                <ImageBackground
                  source={require("../assets/ProjectImages/cal1.png")}
                  resizeMode="cover"
                >
                  <Card.Title
                    title="Calories"
                    titleStyle={styles.predTitleStyle}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Text style={styles.predTextStyle} variant="titleLarge">
                      {predictions[0]}
                    </Text>
                  </Card.Content>
                </ImageBackground>
              </Card>

              <Card style={styles.cardStyle}>
                <ImageBackground
                  source={require("../assets/ProjectImages/carbs1.png")}
                  resizeMode="cover"
                >
                  <Card.Title
                    title="Carbs"
                    titleStyle={styles.predTitleStyle}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Text style={styles.predTextStyle} variant="titleLarge">
                      {predictions[1]}
                    </Text>
                  </Card.Content>
                </ImageBackground>
              </Card>
            </View>
            <View style={styles.cardViewStyle}>
              <Card style={styles.cardStyle}>
                <ImageBackground
                  source={require("../assets/ProjectImages/fat1.png")}
                  resizeMode="cover"
                >
                  <Card.Title title="Fats" titleStyle={styles.predTitleStyle} />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Text style={styles.predTextStyle} variant="titleLarge">
                      {predictions[2]}
                    </Text>
                  </Card.Content>
                </ImageBackground>
              </Card>
              <Card style={styles.cardStyle}>
                <ImageBackground
                  source={require("../assets/ProjectImages/protien1.png")}
                  resizeMode="cover"
                >
                  <Card.Title
                    title="Protiens"
                    titleStyle={styles.predTitleStyle}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Text style={styles.predTextStyle} variant="titleLarge">
                      {predictions[3]}
                    </Text>
                  </Card.Content>
                </ImageBackground>
              </Card>
            </View>
          </View>
        ) : (
          <LinearGradient
            style={styles.btnStyle}
            colors={["#6560D7", "#6987F0"]}
          >
            <Text
              style={styles.btnTextStyle}
              onPress={() => {
                calculateNutritions();
              }}
            >
              Calculate nutritions
            </Text>
          </LinearGradient>
        )}
    
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
    alignItems: "center",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  imgStyle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderColor: "#6560D7",
    borderWidth: 5,
    marginTop: 5,
  },
  foodItemStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomScreen: {
    backgroundColor: "#fff",
    marginTop: 20,
    flex: 2,

    alignItems: "center",
  },
  btnStyle: {
    padding: 5,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    padding: 7,
  },
  cardViewStyle: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cardStyle: {
    padding: 5,
    width: 150,
    margin: 10,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  predTextStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 30,
  },
  predTitleStyle: {
    color: "#00f",
    fontWeight: "bold",
    fontSize: 20,
  },
});
