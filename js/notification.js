/**
 * Notification Class
 *
 * This class is responsible for creating and managing notifications in the application.
 * It allows for the creation of notifications with custom settings such as headline, body, timeout, and close button.
 *
 * @class Notification
 *
 * @property {Object} defaultSettings - The default settings for the notifications.
 * @property {Object} settings - The settings for the current notification.
 * @property {HTMLElement} container - The container for the notifications.
 * @property {HTMLElement} notification - The current notification element.
 *
 * @method init - Initializes the notification functionality and event handlers.
 * @method createNotification - Creates a new notification with the current settings.
 * @method removeNotification - Removes the current notification.
 * @method addNotificationCloseToggle - Adds a close button to the current notification.
 *
 * @author Tim-Raphael
 * @version 1.0
 */


class Notification {
    constructor(settings = {}) {
        this.defaultSettings = {
            headline: '',
            body: '',
            timeout: 5000,
            addClose: true,
        };
        this.settings = { ...this.defaultSettings, ...settings };

        this.init();
    }

    init() {
        this.container = document.querySelector('div#notification-container');

        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';

            document.body.appendChild(this.container);
        }

        this.createNotification();

        if (this.settings.addClose) this.addNotificationCloseToggle();
        if (this.settings.timeout) {
            setTimeout(() => {
                this.removeNotification();
            }, this.settings.timeout);
        }
    }

    createNotification() {
        this.notification = document.createElement('div');
        const markup = `
            <span class="headline">${this.settings.headline}</span>
            <p class="body">${this.settings.body}</p>
        `;

        this.notification.classList.add('notification');
        this.notification.innerHTML = markup;

        this.container.appendChild(this.notification);
    }

    removeNotification() {
        this.notification.classList.add('fade-out');
        setTimeout(() => {
            this.notification.remove();
        }, 300);
    }

    addNotificationCloseToggle() {
        const closeToggle = document.createElement('div');
        closeToggle.classList.add('notification-close');

        closeToggle.addEventListener('click', () => {
            this.removeNotification();
        });

        this.notification.appendChild(closeToggle);
    }
}
