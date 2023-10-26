import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(currentDir, "..", "package.json");

const {
  name: currentName,
  version: currentVersion,
  description: currentDescription,
  author: currentAuthor,
} = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const getNextVersion = (current, type) => {
  const versionParts = current.split(".").map(Number);
  switch (type) {
    case "patch":
      versionParts[2] += 1;
      break;
    case "minor":
      versionParts[1] += 1;
      versionParts[2] = 0;
      break;
    case "major":
      versionParts[0] += 1;
      versionParts[1] = 0;
      versionParts[2] = 0;
      break;
  }
  return versionParts.join(".");
};

const versionTypes = ["patch", "minor", "major"];
const versionChoices = versionTypes.map(
  (type) =>
    `${type.charAt(0).toUpperCase() + type.slice(1)} (v${getNextVersion(
      currentVersion,
      type,
    )})`,
);

const checkDestination = async () => {
  const { isCorrectName } = await inquirer.prompt([
    {
      type: "list",
      name: "isCorrectName",
      message: chalk.yellow(`Is the NPM destination "${currentName}"?`),
      choices: ["YES", "NO (edit destination)", "Cancel"],
    },
  ]);

  if (isCorrectName === "Cancel") {
    console.error(chalk.red("\nNPM shipment cancelled.\n"));
    process.exit();
  }

  let packageName = currentName;
  if (isCorrectName === "NO (edit destination)") {
    const { newPackageName } = await inquirer.prompt([
      {
        type: "input",
        name: "newPackageName",
        message: chalk.yellow(
          "Enter the new destination path (@organisation/package):",
        ),
      },
    ]);
    packageName = newPackageName;
  }

  return { isCorrectName, packageName };
};

const checkDescription = async () => {
  const { isCorrectDescription } = await inquirer.prompt([
    {
      type: "list",
      name: "isCorrectDescription",
      message: chalk.yellow(
        `Is the package description "${currentDescription}"?`,
      ),
      choices: ["YES", "NO (edit description)", "Cancel"],
    },
  ]);

  if (isCorrectDescription === "Cancel") {
    console.error(chalk.red("\nNPM shipment cancelled.\n"));
    process.exit();
  }

  let packageDescription = currentDescription;
  if (isCorrectDescription === "NO (edit description)") {
    const { newPackageDescription } = await inquirer.prompt([
      {
        type: "input",
        name: "newPackageDescription",
        message: chalk.yellow("Enter the new package description:"),
      },
    ]);
    packageDescription = newPackageDescription;
  }

  return { isCorrectDescription, packageDescription };
};

const checkAuthor = async () => {
  const { isCorrectAuthor } = await inquirer.prompt([
    {
      type: "list",
      name: "isCorrectAuthor",
      message: chalk.yellow(`Is the author "${currentAuthor}"?`),
      choices: ["YES", "NO (edit author)", "Cancel"],
    },
  ]);

  if (isCorrectAuthor === "Cancel") {
    console.error(chalk.red("\nNPM shipment cancelled.\n"));
    process.exit();
  }

  let packageAuthor = currentAuthor;
  if (isCorrectAuthor === "NO (edit author)") {
    const { newPackageAuthor } = await inquirer.prompt([
      {
        type: "input",
        name: "newPackageAuthor",
        message: chalk.yellow("Enter the new author name:"),
      },
    ]);
    packageAuthor = newPackageAuthor;
  }

  return { isCorrectAuthor, packageAuthor };
};

const checkVersionType = async () => {
  let specificVersionChoices = versionChoices;
  let isInitialShipment = false;

  // Check if it's the initial version
  if (currentVersion === "0.0.0") {
    specificVersionChoices = ["Initial shipment (v1.0.0)"];
    isInitialShipment = true;
  }

  const { version } = await inquirer.prompt([
    {
      type: "list",
      name: "version",
      message: chalk.yellow(
        `What kind of change is this? (Current v${currentVersion})`,
      ),
      choices: [...specificVersionChoices, "Cancel"],
    },
  ]);

  if (version === "Cancel") {
    console.error(chalk.red("\nNPM shipment cancelled.\n"));
    process.exit();
  }

  return { version, isInitialShipment };
};

const checkChangelog = async () => {
  let changelog = "";
  while (!changelog) {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "changelog",
        message: chalk.yellow("Briefly describe the change:"),
        validate: (input) => {
          if (input) return true;
          return "A change description is required!";
        },
      },
    ]);
    changelog = response.changelog;
  }

  return { changelog };
};

const checkReadmeUpdate = async () => {
  const { hasUpdatedReadme } = await inquirer.prompt([
    {
      type: "list",
      name: "hasUpdatedReadme",
      message: chalk.yellow("Have you updated the README.md file?"),
      choices: ["Yes", "No"],
    },
  ]);

  if (hasUpdatedReadme === "No") {
    console.error(
      chalk.red("\nPlease update the Readme file before shipping to NPM.\n"),
    );
    process.exit();
  }

  return { hasUpdatedReadme };
};

const checkProceed = async () => {
  const { proceed } = await inquirer.prompt([
    {
      type: "list",
      name: "proceed",
      message: chalk.yellow("Package ready! Ship to NPM?"),
      choices: ["Ship", "Cancel"],
    },
  ]);

  if (proceed === "Cancel") {
    console.error(chalk.red("\nNPM shipment cancelled.\n"));
    process.exit();
  }

  return { proceed };
};

const isWorkingTreeClean = () => {
  try {
    const output = execSync("git status --porcelain", { encoding: "utf-8" });
    return output.trim() === "";
  } catch (err) {
    console.error(chalk.red("Failed to check git status:"), err);
    process.exit(1);
  }
};

function rollbackChanges() {
  try {
    // Undo the last commit
    execSync("git reset --hard HEAD~1", { stdio: "ignore" });

    // Revert uncommitted file changes (if any remain after hard reset)
    execSync("git checkout .", { stdio: "ignore" });

    console.log(chalk.yellow("Changes have been rolled back."));
  } catch (rollbackError) {
    console.error(
      chalk.red(
        "Error during rollback, you may need to manually revert changes:",
      ),
      rollbackError,
    );
  }
}

const ship = async () => {
  // Check if the "prod" folder exists
  if (!fs.existsSync(path.join(currentDir, "..", "prod"))) {
    console.error(
      chalk.red(
        "The 'prod' folder does not exist. Please build and test the production files (with pnpm prod) before shipping.",
      ),
    );
    process.exit();
  }

  // Ensure there are no uncommitted changes before proceeding
  if (!isWorkingTreeClean()) {
    console.error(
      chalk.red(
        "Uncommitted changes found. Please commit or stash them before shipping.",
      ),
    );
    console.error(chalk.red("\nNPM shipment cancelled.\n"));
    process.exit();
  }

  // Backup initial package.json
  const packageJsonOriginal = fs.readFileSync(packageJsonPath, "utf-8");
  try {
    console.log(chalk.bold(`Pre-shipment checklist:\n`));

    const { packageName } = await checkDestination();
    const { packageDescription } = await checkDescription();
    const { packageAuthor } = await checkAuthor();
    const { version, isInitialShipment } = await checkVersionType();
    const { changelog } = await checkChangelog();
    await checkReadmeUpdate();
    await checkProceed();

    // Determine changes to apply to package.json
    const packageChanges = {};
    if (packageName) packageChanges.name = packageName;
    if (packageDescription) packageChanges.description = packageDescription;
    if (packageAuthor !== currentAuthor) packageChanges.author = packageAuthor;

    let newVersion;

    if (isInitialShipment) {
      newVersion = "1.0.0";
    } else {
      const versionType = versionTypes[versionChoices.indexOf(version)];
      newVersion = getNextVersion(currentVersion, versionType);
    }

    // Update package.json once all inputs are confirmed and ship proceeds
    if (
      Object.keys(packageChanges).length > 0 ||
      newVersion !== currentVersion
    ) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      Object.assign(packageJson, packageChanges);
      if (newVersion !== currentVersion) {
        packageJson.version = newVersion;
      }
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    // Update the changelog
    const newChangelog = `\n- v${newVersion} ${changelog} (${
      new Date().toISOString().split("T")[0]
    })\n`;
    const changelogPath = path.join(currentDir, "..", "CHANGELOG.md");
    const currentChangelog = fs.readFileSync(changelogPath, "utf-8");
    fs.writeFileSync(changelogPath, newChangelog + currentChangelog);

    console.log("\nShipping package...");

    // CHECK TAG EXISTENCE AND HANDLE IT BEFORE CREATING NEW TAG
    try {
      // Check if tag exists remotely
      const remoteTags = execSync(
        `git ls-remote --tags origin v${newVersion}`,
      ).toString();

      if (remoteTags.includes(newVersion)) {
        console.error(chalk.red(`Tag v${newVersion} already exists remotely.`));
        process.exit(1);
      } else {
        // Tag does not exist remotely, safe to proceed
      }
    } catch (error) {
      // Log error for diagnosis
      console.error(`Error while checking remote tags: ${error}`);
      // In the absence of other information, assume it’s safe to proceed
    }

    try {
      // Check if tag exists locally
      execSync(`git rev-parse v${newVersion}`, { stdio: "pipe" });

      // Delete the local tag since it doesn’t exist remotely
      execSync(`git tag -d v${newVersion}`, { stdio: "pipe" });
    } catch {
      // Tag does not exist locally, safe to proceed
    }

    // Execute ship commands
    execSync("git add .", { stdio: "ignore" });
    execSync(`git commit -m "${changelog}"`, {
      stdio: "ignore",
    });

    // Add tagging for GitHub Actions shipment trigger
    execSync(`git tag v${newVersion}`, { stdio: "ignore" });

    // Ensure everything is pushed to the remote, not just the tags
    execSync(`git push origin main && git push origin v${newVersion}`, {
      stdio: "ignore",
    });

    console.log(
      chalk.bold.green(`\n\n✅ PACKAGE PUSHED TO GITHUB! ✅ (v${newVersion})`),
    );
    console.log(chalk.yellow("\n🥳 Your package should ship to NPM shortly!"));
    console.log("\n👀 Visit GitHub Actions to check NPM shipping status.\n");
  } catch (error) {
    console.error(
      chalk.red("Error during shipment, rolling back changes:"),
      error,
    );
    fs.writeFileSync(packageJsonPath, packageJsonOriginal); // Restore original package.json
    rollbackChanges(); // Rollback git changes
  }
};

ship();
