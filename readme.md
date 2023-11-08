# Webspeech Integration 🎙️

Welcome to the Webspeech class! This is a fun and interactive JavaScript class that brings speech recognition to your web application. It's like having your own personal assistant right in your browser! 🎉

## Features 🚀

- Converts your speech into text using the SpeechRecognition API 🗣️
- Handles those pesky errors and shows notifications 🚨
- Integrates easily with your HTML elements 🎈

## Usage 🛠️

Implement the JS file into your project and link it in your HTML file.
Make sure it loads before your site.js or main.js file.
Call it inside your main JS file.

```javascript:
new Webspeech();
```

## Methods 📚

- init(): This is where the magic starts! It sets up the speech recognition and event handlers. 🎩
- handleResult(): Got a result from the speech recognition? This method takes care of it! 📝
- showErrorNotification(): Oops, an error occurred? No worries, this method will show a notification. 🚨
- hideErrorNotification(): Done with the error? This method hides the notification. 🙈
- stopSpeechRecognition(): This method stops the speech recognition when you're done talking. 🛑

## Contributing 🤝

Got an idea to make this even better? Pull requests are more than welcome! For big changes, please open an issue first to discuss your brilliant idea. 🧠

## Issues 🐛

Found a bug or have a suggestion? Please file an issue. We appreciate your feedback! 🙏

## License 📄

MIT
