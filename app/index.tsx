import FailureFeedback from "@/components/FailureFeedback";
import LanguageCard from "@/components/LanguageCard";
import Statistics from "@/components/Statistics";
import SuccessFeedback from "@/components/SuccessFeedback";
import { Colors } from "@/constants/Colors";
import { getTranslation } from "@/utils/getTranslations";
import { saveResult } from "@/utils/saveResult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function NotFoundScreen() {
  const [currentWord, setCurrentWord] = useState(getTranslation());

  const [isSuccessFeedbackVisible, setIsSuccessFeedbackVisible] =
    useState(false);

  const [isFailureFeedbackVisible, setIsFailureFeedbackVisible] =
    useState(false);

  const onSubmitTranslation = async (input: string) => {
    const parsedInput = input.toLowerCase().trim();
    const isCorrect = currentWord.en.includes(parsedInput);

    setIsSuccessFeedbackVisible(isCorrect);
    setIsFailureFeedbackVisible(!isCorrect);

    await saveResult(isCorrect, currentWord);

    setTimeout(() => {
      setIsSuccessFeedbackVisible(false);
      setIsFailureFeedbackVisible(false);

      setCurrentWord(getTranslation());
    }, 1200);
  };

  const isAnyFeedbackOpen =
    isSuccessFeedbackVisible || isFailureFeedbackVisible;

  return (
    <>
      <Stack.Screen />
      {isSuccessFeedbackVisible && (
        <SuccessFeedback
          word={currentWord.nl}
          correctTranslations={currentWord.en}
        />
      )}
      {isFailureFeedbackVisible && (
        <FailureFeedback
          word={currentWord.nl}
          correctTranslations={currentWord.en}
        />
      )}

      {!isAnyFeedbackOpen && (
        <View
          style={{
            width: "100%",
            minHeight: "100%",
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: Colors.indigo,
              opacity: 0.5,
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: 200,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          />

          <LanguageCard
            word={currentWord.nl}
            phonetic={currentWord.phoneticNl}
            onSubmit={async (input) => await onSubmitTranslation(input)}
          />

          <Statistics />
        </View>
      )}
    </>
  );
}
