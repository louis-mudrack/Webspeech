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
 * @property {HTMLElement} eversearchButton - The search button element.
 * @property {HTMLElement} eversearchInput - The search input field element.
 * @property {HTMLElement} notification - The error notification element.
 * @property {HTMLElement} notificationText - The error notification text element.
 * @property {HTMLElement} closeNotification - The close notification button element.
 * 
 * @method init - Initializes the speech recognition functionality and event handlers.
 * @method handleResult - Handles the result of the speech recognition.
 * @method showErrorNotification - Shows the error notification with appropriate message.
 * @method hideErrorNotification - Hides the error notification.
 * @method stopSpeechRecognition - Stops the speech recognition when the speech ends.
 * 
 * @author Louis Mudrack
 * @version 1.0.0
 * @example
 * new Webspeech();
 */

class Webspeech {
    constructor() {
        this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
        this.recognition = null;
        this.micButton = document.querySelector(".icon-mic");
        this.eversearchButton = document.querySelector("eversearch-input").shadowRoot.querySelector("button");
        this.eversearchInput = document.querySelector("eversearch-input").shadowRoot.querySelector("input");
        this.notification = document.getElementById("error-notification");
        this.notificationText = this.notification.querySelector(".error-type-notification");
        this.closeNotification = this.notification.querySelector(".close-notification");
        this.init();
    }

    init() {
        this.closeNotification.onclick = () => {
            this.hideErrorNotification();
        };
        if (this.SpeechRecognition === null) {
            this.micButton.onclick = () => {
                this.notification.classList.remove("hide-error");
                setTimeout(() => {
                    this.hideErrorNotification();
                }, 8000);
            };
        } else {
            this.recognition = new this.SpeechRecognition();
            this.micButton.onclick = () => {
                this.recognition.start();
                this.handleResult();
            };
        }
    }
    handleResult() {
        this.recognition.onresult = (event) => {
            this.eversearchInput.value = event.results[0][0].transcript;
            this.eversearchButton.click();
        };
        this.stopSpeechRecognition();
        this.showErrorNotification();
    }
    showErrorNotification() {
        this.recognition.onerror = (event) => {
            switch (event.error) {
                case "no-speech":
                    this.notificationText.textContent = `Sie haben nicht geredet!`;
                    break;
                case "not-allowed":
                    this.notificationText.textContent = `Spracheingabe nicht akzeptiert!`;
                    break;
                default:
                    this.notificationText.textContent = `Error: ${event.error}`;
            }
            this.notification.classList.remove("hide-error");
            setTimeout(() => {
                this.hideErrorNotification();
            }, 8000);
        }
    }
    hideErrorNotification() {
        this.notification.classList.add("hide-error");
    }
    stopSpeechRecognition() {
        this.recognition.onspeechend = () => {
            this.recognition.stop();
        };
    }
}
