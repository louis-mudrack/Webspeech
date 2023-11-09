/**
 * Webspeech Class
 *
 * This class is responsible for handling the speech recognition functionality of the application.
 * It uses the SpeechRecognition API to convert speech to text and display it in the search input field.
 * It also handles errors and displays appropriate error notifications.
 *
 * @class Webspeech
 *
 * @property {Object} SpeechRecognition - The SpeechRecognition API object.
 * @property {Object} recognition - The instance of the SpeechRecognition object.
 * @property {HTMLElement} micButton - The microphone button element.
 * @property {HTMLElement} searchButton - The search button if one exists.
 * @property {HTMLElement} searchInput - The search input field element.
 *
 * @method init - Initializes the speech recognition functionality and event handlers.
 * @method handleResult - Handles the result of the speech recognition.
 * @method showErrorNotification - Shows the error notification with appropriate message.
 * @method stopSpeechRecognition - Stops the speech recognition when the speech ends.
 *
 * @author Louis Mudrack
 * @version 1.1.0
 */


class Webspeech {
    constructor(selectors) {
        this.SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition || null;
        this.recognition = null;
        this.micButton = document.querySelector(selectors.startTalking);
        this.searchButton = document.querySelector(selectors.submitInput);
        this.searchInput = document.querySelector(selectors.input);
        this.init();
    }

    init() {
        if (this.SpeechRecognition === null) {
            this.micButton.onclick = () => {
                new Notification({
                    headline: 'Error:',
                    body: 'Voice input is not supported.',
                });
            };
        } else {
            this.recognition = new this.SpeechRecognition();
            this.micButton.onclick = () => {
                this.recognition.start();
                this.handleResult();
                this.showErrorNotification();
            };
        }
    }

    handleResult() {
        this.recognition.onresult = (event) => {
            this.searchInput.value = event.results[0][0].transcript;
            if (this.searchButton) {
                this.searchButton.click();
            }
        };
        this.stopSpeechRecognition();
    }

    showErrorNotification() {
        this.recognition.onerror = (event) => {
            switch (event.error) {
                case 'no-speech':
                    new Notification({ body: "You didn'nt speak!" });
                    break;
                case 'not-allowed':
                    new Notification({ body: 'Voice input was not accepted!' });
                    break;
                default:
                    new Notification({
                        headline: 'Error:',
                        body: `${event.error}`,
                    });
            }
        };
    }

    stopSpeechRecognition() {
        this.recognition.onspeechend = () => {
            this.recognition.stop();
        };
    }
}
