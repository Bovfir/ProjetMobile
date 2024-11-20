import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function Component1() {
  const [color, setColor] = useState("Rouge");

  const changeColor = () => {
    setColor((prevColor) => (prevColor === "Rouge" ? "Bleu" : "Rouge"));
  };

  return (
    <View>
      <Text style={{ fontSize: 24 }}>Couleur : {color}</Text>
      <Button title="Change color" onPress={changeColor} />
    </View>
  );
}
