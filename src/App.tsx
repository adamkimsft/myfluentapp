import React, { FormEvent, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { 
  Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, 
  ITextStyles, ThemeProvider, mergeStyles, 
  FontIcon, PrimaryButton, getTheme, 
  TextField} from '@fluentui/react';
import { Controller, useForm } from "react-hook-form";
import logo from './logo.svg';
import './App.css';
import { DARK, useTheme, webDarkTheme, webLightTheme } from './theme';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};
const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
});

const buttonStyles = {
  root: { backgroundColor: "maroon" },
  rootHovered: { backgroundColor: "green" },
};

export const App: React.FunctionComponent = () => {
  const { theme, updateTheme } = useTheme();
  const appliedTheme = theme === DARK ? webDarkTheme : webLightTheme;
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const currTheme = getTheme();

  const [summaryText, setSummaryText] = useState<string>("");

  const listenToUser = () => {
    console.log("listenToUser called.  listening = " + listening);
    if (listening == false) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const speakPage = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = document.body.innerText;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (listening === false) {
      resetTranscript();
      // TODO: Insert text where the cursor is.  For now, let's just append.
      setSummaryText(summaryText + transcript);
      console.log("clearing transcript");
    }
  }, [listening]);

  const onStatusChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, fieldValue?: string | undefined) => {
  // const onStatusChange = <T extends {}>(fieldName: string, fieldValue: T) => {
    const fieldValueString = `${fieldValue}`;
    // setValue("status", `${fieldValue}`);
    setSummaryText(fieldValueString); // replace with line above in Ceres
    console.log(fieldValueString);
    // setNewStatusReasonDescription(
    //   !isStringEmpty(fieldValueString)
    //     ? `${new Date().toDateString()}: ${fieldValue} ${HookInlineFormStrings.by} ${getUserUpn()}.`
    //     : ""
    // );
    // fieldValue && trigger("status");
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
        <img className="App-logo" src={logo} alt="logo" />

        <PrimaryButton
          iconProps={{ iconName: "Microphone" }}
          text="Read Page Aloud"
          onClick={speakPage} 
          />
        <hr/>
        <p>
          Press Talk to append text to the text field.
        </p>
        <PrimaryButton
          iconProps={{ iconName: "Microphone" }}
          text="Talk"
          onClick={listenToUser} 
          styles={{ root: { color: listening ? "red" : ""}}}
          />
        <Stack horizontal tokens={stackTokens} horizontalAlign="center">
        <form>
          <TextField
            value={summaryText + transcript}
            id="status"
            onChange={onStatusChange}
            multiline={true}
          />
        </form>

        </Stack>
      </Stack>
    </ThemeProvider>
  );
};
