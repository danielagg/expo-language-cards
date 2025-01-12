import FailureFeedback from "@/components/FailureFeedback";
import LanguageCard from "@/components/LanguageCard";
import Statistics from "@/components/Statistics";
import SuccessFeedback from "@/components/SuccessFeedback";
import { Colors } from "@/constants/Colors";
import { saveResult } from "@/utils/saveResult";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { Translation } from "@/types/Translation";

export default function NotFoundScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const getTranslation = async (): Promise<Translation> => {
    const nlWords = await drizzleDb.select().from(schema.nlWords);
    const nlWord = nlWords[0];

    const englishTranslation = await drizzleDb
      .select()
      .from(schema.enTranslations)
      .where(eq(schema.enTranslations.nlId, nlWord.id));

    return {
      nl: nlWord.nl,
      en: englishTranslation.map((t) => t.en),
      phoneticNl: nlWord.phoneticNl,
    };
  };

  const [currentWord, setCurrentWord] = useState<Translation | null>(null);

  useEffect(() => {
    const run = async () => {
      const translation = await getTranslation();
      setCurrentWord(translation);
    };

    run();
  }, []);

  const [isSuccessFeedbackVisible, setIsSuccessFeedbackVisible] =
    useState(false);

  const [isFailureFeedbackVisible, setIsFailureFeedbackVisible] =
    useState(false);

  const onSubmitTranslation = async (input: string) => {
    const parsedInput = input.toLowerCase().trim();
    const isCorrect = currentWord!.en.includes(parsedInput);

    setIsSuccessFeedbackVisible(isCorrect);
    setIsFailureFeedbackVisible(!isCorrect);

    await saveResult(isCorrect, currentWord!);

    setTimeout(async () => {
      setIsSuccessFeedbackVisible(false);
      setIsFailureFeedbackVisible(false);

      setCurrentWord(await getTranslation());
    }, 1200);
  };

  const isAnyFeedbackOpen =
    isSuccessFeedbackVisible || isFailureFeedbackVisible;

  return (
    <>
      <Stack.Screen />
      {isSuccessFeedbackVisible && (
        <SuccessFeedback
          word={currentWord!.nl}
          correctTranslations={currentWord!.en}
        />
      )}
      {isFailureFeedbackVisible && (
        <FailureFeedback
          word={currentWord!.nl}
          correctTranslations={currentWord!.en}
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

          {currentWord ? (
            <LanguageCard
              word={currentWord.nl}
              phonetic={currentWord.phoneticNl}
              onSubmit={async (input) => await onSubmitTranslation(input)}
            />
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}

          <Statistics />
        </View>
      )}
    </>
  );
}
