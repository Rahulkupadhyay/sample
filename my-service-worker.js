importScripts('./ngsw-worker.js');

function onClick(event) {
    // Handle the click event and keep the SW alive until it's handled.
    event.waitUntil(this.handleClick(event.notification, event.action));
}

function handleClick(notification, action) {
    return __awaiter$5(this, void 0, void 0, function* () {
        notification.close();
        const options = {};
        // The filter uses `name in notification` because the properties are on the prototype so
        // hasOwnProperty does not work here
        NOTIFICATION_OPTION_NAMES.filter(name => name in notification)
            .forEach(name => options[name] = notification[name]);
        yield this.broadcast({
            type: 'NOTIFICATION_CLICK',
            data: { action, notification: options },
        });
    });
}

self.addEventListener('notificationclick', (event) => {
    let that = this;
    event.waitUntil(async function () {
        const allClients = await clients.matchAll({
            includeUncontrolled: true
        });

        let appClient;
        // Let's see if we already have a chat window open:
        for (const client of allClients) {
            const url = new URL(client.url);

            if (url.pathname == '/sample/') {
                // Excellent, let's use it!
                client.focus();
                appClient = client;
                break;
            }
        }

        // If we didn't find an existing chat window,
        // open a new one:
        if (!appClient) {
            appClient = await clients.openWindow('/sample/');
        }

        // Message the client:
        that.onClick(event);
    }());
})