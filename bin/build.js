const esbuild = require("esbuild");
const { obfuscate } = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");
const reloadClientScript = require("./reload.js"); // Importing the reload client script

const isProd = process.env.NODE_ENV === "production";
const srcPath = path.join(__dirname, "..", "src/files/");
const outdir = path.join(__dirname, "..", isProd ? "prod" : "dev");

const getEntryPoints = async (srcPath, ext) => {
  const files = await fs.promises.readdir(srcPath);
  return files
    .filter((file) => path.extname(file) === ext)
    .map((file) => path.join(srcPath, file));
};

const build = async () => {
  try {
    const jsEntryPoints = await getEntryPoints(srcPath, ".js");
    const cssEntryPoints = await getEntryPoints(srcPath, ".css");

    await esbuild.build({
      entryPoints: jsEntryPoints,
      bundle: true,
      minify: isProd,
      sourcemap: !isProd,
      outdir,
      define: {
        "process.env.NODE_ENV": isProd ? '"production"' : '"development"',
      },
    });

    // Add WebSocket client code to JS files for development only
    if (!isProd) {
      for (const entryPoint of jsEntryPoints) {
        const outputPath = path.join(outdir, path.basename(entryPoint));
        const originalCode = await fs.promises.readFile(outputPath, "utf8");
        await fs.promises.writeFile(
          outputPath,
          originalCode + reloadClientScript,
        );
      }
    }

    if (isProd) {
      const obfuscationOptions = {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.1,
        deadCodeInjection: false,
        stringArray: true,
        rotateStringArray: true,
        identifiersPrefix: "a",
        renameGlobals: false,
      };

      for (const entryPoint of jsEntryPoints) {
        const outputPath = path.join(outdir, path.basename(entryPoint));
        const originalCode = await fs.promises.readFile(outputPath, "utf-8");
        const obfuscatedCode = obfuscate(
          originalCode,
          obfuscationOptions,
        ).getObfuscatedCode();
        await fs.promises.writeFile(outputPath, obfuscatedCode);
      }
    }

    for (const cssFile of cssEntryPoints) {
      await esbuild
        .build({
          entryPoints: [cssFile],
          outfile: `${outdir}/${path.basename(cssFile)}`,
          bundle: false,
          minify: isProd,
        })
        .catch(() => process.exit(1));
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
};

build();
