import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

export default function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  function unmberInputHandler(inputText) {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  }

  function resetInputHandler() {
    setEnteredValue("");
    setConfirmed(false);
  }

  function confirmeInputHandler() {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "OK", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          Start Game
        </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.inputConatiner}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            keyboardType="number-pad"
            maxLength={2}
            value={enteredValue}
            onChangeText={unmberInputHandler}
          />
          <View style={styles.buttonConatiner}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.primary}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color={Colors.accent}
                onPress={confirmeInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputConatiner: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  buttonConatiner: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: Dimensions.get("window").width / 4,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
