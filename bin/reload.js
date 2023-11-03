const localPort = require("./localport");

module.exports = `
(function() {
    if (!window.__devKitSocketInitialized) {
        window.__devKitSocketInitialized = true;
        const socket = new WebSocket('ws://localhost:${localPort}'); // Use template literals here
        socket.addEventListener('message', (event) => {
            if (event.data === 'reload') {
                location.reload();
            }
        });
        socket.addEventListener('close', () => {
            if (!window.__devKitSocketClosedLogged) {
                window.__devKitSocketClosedLogged = true;
                console.log('%c[DevKit]: ⚫️ Local server turned OFF', 'font-weight: bold;');
            }
            setTimeout(() => location.reload(), 2000);
        });
    }
})();
`;
