module.exports = `
(function() {
    const socket = new WebSocket('ws://localhost:3000');
    socket.addEventListener('message', (event) => {
        if (event.data === 'reload') {
            location.reload();
        }
    });
    socket.addEventListener('close', () => {
        console.log('[DevKit]: 🔴 Local server turned OFF');
        setTimeout(() => location.reload(), 1000);
    });
})();
`;
