importScripts('./ngsw-worker.js');

this.addEventListener('notificationclick', (event) => {

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

        appClient.postMessage({
            msg: event,
          });
    }());
});