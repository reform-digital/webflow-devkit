const localPort = require("./localport");
const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");
const chokidar = require("chokidar");
const { exec } = require("child_process");
const isProd = process.env.NODE_ENV === "production";
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });
const OUT_DIR = isProd ? "prod" : "dev";
const ENV_NAME = isProd ? "PROD" : "DEV";
const LOG_COLOR = isProd ? "\x1b[96m" : "\x1b[32m";

app.use(express.static(OUT_DIR));

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

chokidar;
chokidar
  .watch(path.join(__dirname, "..", "src/**/*.{js,css,html}"))
  .on("change", () => {
    if (!isProd) {
      exec("node bin/build.js", (error, stdout, stderr) => {
        if (error) {
          console.log(`\x1b[90mError during build: ${error}\x1b[0m`);
          return;
        }
        if (stdout) console.log(`Build output: ${stdout}`);
        if (stderr) console.log(`Build errors: ${stderr}`);
        wss.broadcast("reload");
      });
    } else {
      wss.broadcast("reload");
    }
  });

server.listen(localPort, () => {
  console.log(
    LOG_COLOR,
    `\n[${ENV_NAME}] Local server RUNNING...`,
    "\x1b[0m \x1b[90m[Ctrl+C] to turn OFF\x1b[0m\n",
  );

  const outputFiles = fs.readdirSync(path.resolve(__dirname, "..", OUT_DIR));

  const scriptTags = outputFiles
    .filter((file) => file.endsWith(".js"))
    .map(
      (file) =>
        `<script src="http://localhost:${localPort}/${file}" defer></script>`,
    );
  const linkTags = outputFiles
    .filter((file) => file.endsWith(".css"))
    .map(
      (file) =>
        `<link rel="stylesheet" href="http://localhost:${localPort}/${file}">`,
    );

  if (scriptTags.length > 0) {
    console.log(
      "\n\x1b[1m=== JS Scripts: ===\x1b[0m \x1b[90m(Before </body> tag)\x1b[0m",
    );
    scriptTags.forEach((tag) => console.log("\n\x1b[33m", tag, "\x1b[0m"));
  }

  if (linkTags.length > 0) {
    console.log(
      "\n\x1b[1m=== CSS Scripts: ===\x1b[0m \x1b[90m(Inside <head> tag)\x1b[0m",
    );
    linkTags.forEach((tag) => console.log("\n\x1b[33m", tag, "\x1b[0m"));
  }
  console.log("\n\n\x1b[1m=== Alternative Import Method: ===\x1b[0m");
  console.log(
    "\n\x1b[33mUse DevKit's \x1b]8;;https://github.com/reform-digital/webflow-devkit#2%EF%B8%8F%E2%83%A3-automated-method-recommended\x1b\\\x1b[1mAutomated Method\x1b]8;;\x1b\\\x1b[33m\x1b[22m for better script integration.\x1b[0m",
  );
});

process.on("SIGINT", function () {
  console.log(
    LOG_COLOR,
    `\n\n[${ENV_NAME}] Local server turned OFF`,
    "\x1b[0m\n",
  );
  process.exit();
});
