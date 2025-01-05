import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  word: string;
  correctTranslations: string[];
};

export default function FailureFeedback({ word, correctTranslations }: Props) {
  return (
    <LinearGradient
      colors={["#ef4444", "#9d174d"]}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: Colors.text,
          fontSize: 36,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Not quite!
      </Text>
      <Text
        style={{
          width: "70%",
          fontSize: 16,
          textAlign: "center",
          color: Colors.text,
          opacity: 0.8,
          paddingTop: 14,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{word}</Text> <Text>means</Text>{" "}
        <Text style={{ fontWeight: "bold" }}>
          {correctTranslations.join(", ")}
        </Text>
      </Text>
    </LinearGradient>
  );
}
