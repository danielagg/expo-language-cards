import { Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  word: string;
  correctTranslations: string[];
};

export default function SuccessFeedback({ word, correctTranslations }: Props) {
  return (
    <LinearGradient
      colors={["#22c55e", "#0f766e"]}
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
        You got it!
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
        <Text style={{ fontWeight: "bold" }}>{word}</Text>{" "}
        <Text>does indeed mean</Text>{" "}
        <Text style={{ fontWeight: "bold" }}>
          {correctTranslations.join(", ")}
        </Text>
      </Text>
    </LinearGradient>
  );
}
