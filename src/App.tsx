import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { 
  Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, 
  ITextStyles, ThemeProvider, mergeStyles, 
  FontIcon, PrimaryButton, getTheme } from '@fluentui/react';
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
  const [ speechState, updateSpeechState ] = useState(false);
  const { transcript } = useSpeechRecognition();

  const currTheme = getTheme();
  
  const listenToUser = () => {
    console.log("listenToUser called with state " + speechState);
    if (speechState == false) {
      SpeechRecognition.startListening();
      updateSpeechState(true);
    } else {
      SpeechRecognition.stopListening();
      updateSpeechState(false);

    }
  };

  const speakPage = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = document.body.innerText;
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <ThemeProvider theme={appliedTheme}>
      <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
        <img className="App-logo" src={logo} alt="logo" />
        {/* <FontIcon aria-label="Compass" iconName="Microphone" className={iconClass} onClick={listenToUser} style={{ border: "1px solid red"}}/> */}
        <Text variant="xxLarge" styles={boldStyle}>
          Custom welcome message: { transcript }
        </Text>
        <PrimaryButton
          iconProps={{ iconName: "Microphone" }}
          text="Talk"
          onClick={listenToUser} 
          styles={{ root: { color: speechState ? "red" : ""}}}
          />
        <PrimaryButton
          iconProps={{ iconName: "Microphone" }}
          text="Read Page Aloud"
          onClick={speakPage} 
          />
        <Text variant="large">For a guide on how to customize this project, check out the Fluent UI documentation.</Text>
        <Text variant="large" styles={boldStyle}>
          Essential links
        </Text>
        <Stack horizontal tokens={stackTokens} horizontalAlign="center">
          <Link href="https://developer.microsoft.com/en-us/fluentui#/get-started/web">Docs</Link>
          <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">Stack Overflow</Link>
          <Link href="https://github.com/microsoft/fluentui/">Github</Link>
          <Link href="https://twitter.com/fluentui">Twitter</Link>
        </Stack>
        <Text variant="large" styles={boldStyle}>
          Design system
        </Text>
        <Stack horizontal tokens={stackTokens} horizontalAlign="center">
          <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web/icons">Icons</Link>
          <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web">Styles</Link>
          <Link href="https://aka.ms/themedesigner">Theme designer</Link>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};
