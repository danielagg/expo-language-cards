import { Colors } from "@/constants/Colors";
import { View, Text, TextInput, Platform, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

type Props = {
  word: string;
  phonetic: string;
  onSubmit: (input: string) => void;
};

export default function LanguageCard({ word, phonetic, onSubmit }: Props) {
  const [input, setInput] = useState("");

  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        paddingHorizontal: 40,
        paddingTop: 80,
      }}
    >
      <View
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: 250,
            borderRadius: 26,
            padding: 20,
            backgroundColor: Colors.tint,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: Colors.background,
            }}
          >
            {word}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: Colors.background,
              opacity: 0.5,
            }}
          >
            /{phonetic}/
          </Text>
        </View>

        <View
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 20,
            gap: 10,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#1e293b",
              borderWidth: 1,
              borderColor: "#334155",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              padding: 10,
              color: Colors.text,
            }}
            autoFocus
            value={input}
            onChangeText={setInput}
          />
          <Pressable
            style={{
              backgroundColor: Colors.indigo,
              position: "absolute",
              right: 0,
              borderRadius: 1000,
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => onSubmit(input)}
          >
            <Feather name="send" size={20} color={Colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
