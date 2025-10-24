_\*Proudly built with [Webflow DevKit](https://github.com/reform-digital/webflow-devkit)_

# Webflow DevKit™ – by Reform Digital®

![DevKit Image](https://uploads-ssl.webflow.com/61700604b1b79e1cd9ef9412/6618f3d81b4b7e5a7b89c264_DevKit.png "Webflow DevKit")

Webflow DevKit serves as a powerful template, employed by the development team at [Reform Digital®](https://reform.digital) - an award-winning Webflow agency and partner. Designed with a keen emphasis on upholding best practices and optimizing workflows, it aims to revolutionize web development processes. Specifically sculpted to complement Webflow development, this kit harmoniously integrates simplicity and efficiency, seeking to seamlessly embed them into your project lifecycle.

Before diving into development, please read through this documentation to familiarize yourself with the working structure of the template.

## Table of Contents

- [Introduction](#introduction)
- [Included Tools](#included-tools)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Setup Template](#step-1-setup-template)
  - [Step 2: Setup Public SSH Key](#step-2-setup-public-ssh-key-first-time-only)
  - [Step 3: Setup Private SSH Key](#step-3-setup-private-ssh-key-for-every-new-project)
  - [Step 4: Setup NPM](#step-4-setup-npm)
  - [Step 5: Setup Your Project](#step-5-setup-your-project)
- [How to use DevKit](#how-to-use-devkit)
  - [Project Folders](#project-folders)
  - [Building & Testing in Development](#building-testing-in-development)
  - [Pre-commit Hooks](#pre-commit-hooks)
  - [Importing Scripts in Webflow](#importing-scripts-in-webflow)
  - [Building & Testing in Production](#building-testing-in-production)
  - [Shipping to NPM](#shipping-to-npm)
  - [Addressing Version Caching](#addressing-version-caching)
  - [Working with Branches & Contributing](#working-with-branches)
- [Condensed Guide (for Existing DevKit Users)](#condensed-guide-for-existing-devkit-users)

<a name="introduction"></a>

## 🏁 Introduction

The Webflow DevKit by Reform Digital® is more than just a tool—it represents a holistic approach to web development, offering a structured framework that aligns with the modern dynamics of the Webflow platform. Whether you're starting from scratch or integrating into an existing project, this template encapsulates a workflow optimized for efficiency, clarity, and scalability.

### Workflow Overview

1. **Local Development in Sync with GitHub:** Write and revise your code locally while maintaining version control through a synchronized GitHub repository. This enables collaborative work, easy version tracking, and a centralized source of truth for your project.

2. **Testing via Local Server:** Before deploying any changes, test your code in real-time through a local server environment. This allows for rigorous debugging, performance analysis, and ensures the integrity of your code.

3. **Deploy to NPM:** Once you're satisfied with your local iterations, deploy your code to NPM. NPM serves as a reliable package manager, allowing you to manage and distribute your code efficiently.

4. **Serve to Webflow via JsDelivr CDN:** By utilizing the JsDelivr CDN, your deployed code can be seamlessly integrated into your Webflow projects. This ensures fast delivery, high uptime, and optimal performance for your web applications.

5. **Iterate, Version, and Scale:** The Webflow DevKit encourages iterative development. As your project grows, easily roll out new versions of your code. This modular approach ensures future maintenance, continuous scaling, and flexibility.

By leveraging the capabilities of this DevKit, developers can focus on what truly matters—the development process, while being assured that the underlying mechanics and workflows are robust, streamlined, and in tune with best practices.

<a name="included-tools"></a>

## 🛠️ Included Tools

- **[pnpm](https://pnpm.io/):** A fast, disk space-efficient package manager for installing code libraries.

- **[esbuild](https://esbuild.github.io/):** An extremely fast JavaScript bundler and minifier, known for drastically reducing build times.

- **[Prettier](https://prettier.io/):** An opinionated code formatter that enforces a consistent style across your codebase by re-formatting code.

- **[ESLint](https://eslint.org/):** A tool for identifying and fixing problems in your JavaScript code with additional configurations for seamless integration with Prettier:

  - **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier):** Disables ESLint rules that might conflict with Prettier.
  - **[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier):** Runs Prettier as an ESLint rule.

- **[javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator):** A tool for obfuscating JavaScript code, making it more difficult to understand and reverse engineer production code.

- **[chalk](https://github.com/chalk/chalk):** A tool that adds color and style to text in the command line, making it easier and more pleasant to read.

- **[Express](https://expressjs.com/):** A tool for creating web servers through local host for real-time code testing.

- **[Inquirer](https://github.com/SBoudrias/Inquirer.js/):** A user interface library designed to streamline the deployment process. By presenting users with interactive checklists and guided questions, it negates the need for manual editing of scripts and JSON files, ensuring a smoother and more intuitive package setup.

- **[jQuery](https://jquery.com/):** A fast, small, and feature-rich JavaScript library designed to simplify tasks like HTML document traversal and manipulation, event handling, and animation. Webflow projects automatically include the jQuery library, enabling developers to utilize its functionalities without any additional setup. Recognizing this, Webflow DevKit seamlessly integrates support for jQuery syntax, without the need to import the library.

- **[Husky](https://typicode.github.io/husky/):** A tool for managing Git hooks, ensuring that code quality checks run automatically before commits. This prevents poorly formatted or linted code from being committed to the repository.

- **[lint-staged](https://github.com/okonet/lint-staged):** A tool that runs linters on staged Git files, ensuring that only the files you're committing are checked and formatted. This provides fast, efficient code quality enforcement during the commit process.

<a name="prerequisites"></a>

## ⚙️ Prerequisites

Before utilizing this template, ensure the following software and environments are installed on your local machine:

- **[Visual Studio Code](https://code.visualstudio.com/):** A source-code editor that you'll use for writing and managing your code.
- **[Node.js](https://nodejs.org/):** A JavaScript runtime to build and run your applications.
- **[GitHub Desktop](https://desktop.github.com/):** (Optional, but recommended) A graphical interface that enables you to interact with GitHub without using the command line.
- **[Google Chrome](https://www.google.com/chrome/):** A Chromium-based browser such as Google Chrome or Arc is required. Please note that this template is not compatible with Safari or some other browsers and may not function as intended if used with them.

---

<a name="installation"></a>

# 🖥️ Installation

If you are an existing DevKit user, you can skip this detailed guide and view the [Condensed Guide](#condensed-guide-for-existing-devkit-users) instead.

## Step 1: Setup Template

1. **Create GitHub account**:
   - If you haven’t done so, [create a GitHub account](https://github.com/join).
2. **Clone this template**:
   - Navigate to the [main page](https://github.com/reform-digital/webflow-devkit) of the template repository.
   - Click on `Use this template` at the top of the repository and choose `Create a new repository`.
   - Ensure the "Owner" is your GitHub username, and give your repository a unique name relevant to the project (e.g., `client-project-name`).
   - Choose `Private` as the repository visibility.
   - Click on `Create repository` to generate your new repository.
3. **Download the Repository Locally Using GitHub Desktop**:
   - Navigate to your newly created GitHub repository (if not redirected there already upon creation).
   - Click on the `Code` button, and then choose `Open with GitHub Desktop`.
   - Follow the steps in GitHub Desktop to choose a folder on your local machine where the repository files will be downloaded and synchronized, and press `clone`.
4. **Launch Your Development Environment**:
   - In GitHub Desktop, check that your new repository is now listed under `Current Repository` and if not make sure to select it.
   - Click on the `Repository` tab in the top menu, and choose `Open in Visual Studio Code` or use the quick button link.
   - Visual Studio Code should launch, opening your project repository locally, ready for development.

### Understanding Steps 2 & 3 (SSH Key Configuration)

When working on software projects, especially those that involve collaboration or automation, secure access to resources becomes paramount. A widely adopted method for securing this access is through **SSH (Secure SHell)** keys, a cryptographic system that facilitates encrypted communication between your computer and platforms like GitHub.

SSH keys work in pairs: a `private key` and a `public key`. Upon generation, the private key remains on your computer and should be kept confidential. For certain automated workflows, like those in the Webflow DevKit template, the private key is required to be securely stored within the GitHub repository as a secret. This private key is always paired with its corresponding public key, which is stored in your general GitHub account settings. The public key's role is to recognize and trust incoming connections from your computer, ensuring authenticated access.

For our specific use-case, we've incorporated **GitHub Actions** as our **Continuous Integration (CI)** and **Continuous Deployment (CD)** mechanism. This CI/CD mechanism handles tasks like automating version bumping and deploying production code to NPM, which can subsequently get served to your Webflow project via JsDelivr.

The steps that follow will walk you through the generation of an `SSH key pair`, integrating it with your GitHub account for authentication, and then securely archiving the private key in your GitHub repository as a secret. This structured approach ensures both your project and GitHub Actions can securely liaise with vital resources on GitHub, eliminating the need for exposing direct login credentials.

## Step 2: Setup SSH Key Pair & Public Key (First-Time Only)

In this step, you'll generate an SSH key pair and add the public key to your GitHub account, enabling GitHub to recognize and trust communications from your computer. The good news is, once you've set this up, you won't have to repeat this step for future projects. It's a one-time configuration that benefits all your subsequent projects. To begin:

1. **Open Terminal**:

   - Open a new terminal window within your Visual Studio Code session that contains your current project. You can achieve this by selecting `Terminal` from the main toolbar, followed by `New Terminal`. Alternatively, Mac users can use the `control`+`~` shortcut.

2. **Check for Existing SSH Keys**:

   - Before creating a new SSH key, it's important to check if you already have an existing key that you can use.
   - Open your terminal and execute the following command to see if existing SSH keys are present:

     ```sh
     ls -al ~/.ssh
     ```

   - Look for files named `id_rsa.pub`, `id_ecdsa.pub`, or `id_ed25519.pub`. If such a file exists, you can skip Steps 3 & 4 below and proceed to add the key to GitHub (Step 5), **if you haven't already added it previously**.

   - If no existing keys are suitable, or if you prefer to create a new one, follow the steps below to generate a new SSH key pair.

3. **Generate SSH Key Pair**:

   - Execute the following command in your terminal. Ensure the `email` you use matches the one registered on your GitHub account.

     ```sh
       ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
     ```

   - When **prompted**, it's advisable to opt for default settings and leave the passphrase empty for seamless deployment workflows. Adding a passphrase provides an extra layer of security, but it can introduce inconvenience. You'd be prompted to enter this passphrase each time you run deployment workflows. This could become tedious, especially if you revisit the project codebase after a prolonged period and potentially forget the passphrase.

4. **Add SSH Key to the SSH-Agent**:

   - **For macOS/Linux:** Execute the following commands in your terminal:

     ```sh
       eval "$(ssh-agent -s)"
       ssh-add ~/.ssh/id_rsa
     ```

     If you are using an existing key, replace id_rsa with the name of your existing private key file if it's different.

   - **For Windows:** Utilize an SSH agent available through Git Bash, Cygwin, or another tool.

5. **Add SSH Key to GitHub Account**:

   - Execute this command to automatically copy the **SSH Public Key** to your clipboard to minimise error:

     - **Mac**:
       ```sh
       cat ~/.ssh/id_rsa.pub | pbcopy
       ```
       If you are using an existing key, replace id_rsa with the name of your existing public key file if it's different.
     - **Manual Copying** (make sure to copy all contents after running command):
       ```sh
       cat ~/.ssh/id_rsa.pub
       ```

   - Navigate to your GitHub account's SSH settings (`Profile icon` > `Settings` > `SSH and GPG keys`).
   - Click `New SSH key`, assign a descriptive `Title`, choose `Authentication key` under Key type, paste your copied public key under `Key`, and save it by pressing `Add SSH key`.

## Step 3: Setup Private SSH Key (For Every New Project)

Now, you'll securely store your SSH private key in the GitHub repository as a secret. This step is essential for enabling secure interactions between your project and the integrated CI/CD tools, allowing them to authenticate as if they were your computer.

1.  **Store SSH Key as GitHub Secret in the Repository**:

    - Execute this command to automatically copy the **SSH Private Key** to your clipboard to minimise error:
      - **Mac:**
        ```sh
        cat ~/.ssh/id_rsa | pbcopy
        ```
      - **Manual Copying** (make sure to copy all contents including the **BEGIN** and **END** tags):
        ```sh
        cat ~/.ssh/id_rsa
        ```
    - Navigate to your new project repository on GitHub (the one where you cloned this template).
    - Go to the project `Settings`. Make sure you are in the project settings and not the global account settings accessed via your profile image.
    - In the sidebar menu under the `Security` section, click on the `Secrets and variables` dropdown, then choose `Actions`.
    - Click `New repository secret`.
    - Name it **`SSH_TOKEN`** (name must match this exactly) and paste the SSH private key content into the value field.
    - Click `Add secret` to finalize.

## Step 4: Setup NPM

1. **Create a Free NPM Account:**

   - If not done so already, create a free [NPM account](https://www.npmjs.com/).

2. **(Optional) Create an NPM Organization:**

   - If you intend to manage your package under your own account/organization, you may **skip this step**.
   - If multiple owners or specific permissions for a project are required (e.g., for a client project), create a new NPM organization under your account.
   - Name it according to your client’s company or project name.
   - Grant your client permission to this organization whenever needed.

3. **Create an NPM Access Token:**

   - Click on your profile icon in NPM and select `Access Tokens`.
   - Click `Generate New Token` and select `Granular Access Token`.
   - Name it descriptively, such as "Your-Project-Name NPM Token".
   - **Configure Permissions:**
     - Select `Read and write` access (required for publishing packages)
     - Choose the appropriate scope (your package scope or organization)
   - **Set Expiration:** Choose between 7-90 days (recommended: 30 days for regular rotation)
   - Click `Generate Token` to finish.

4. **Copy Your NPM Token:**

   - Ensure that the generated token is copied as it cannot be viewed again.

5. **Add the NPM Token as a GitHub Secret:**
   - Navigate to your new project repository on GitHub (the one you created by cloning this template).
   - Go to the project `Settings`, ensuring you are accessing project-specific settings (which are accessed via a link on the project toolbar), not global account settings (which are accessed via your profile icon).
   - In the sidebar menu under the `Security` section, select the `Secrets and variables` dropdown, then choose `Actions`.
   - Click `New repository secret`.
   - Name it **`NPM_TOKEN`** (name must match this exactly) and paste the NPM token into the value field.
   - Click `Add secret` to finalize.

## Step 5: Setup Your Project

This section guides you through setting up your project package in Visual Studio Code, which involves installing a package manager, managing dependencies, and initial setup. Make sure you have the correct project and directory loaded in Visual Studio Code – you can always use GitHub desktop to load the correct repository (as you did in [Step 1.4](#step-1-setup-template)).

1. **Install pnpm (First-Time Only):**

   - pnpm is a fast, disk space efficient package manager. If it's your first time using pnpm, install it globally with the following command:
     ```sh
     npm install -g pnpm
     ```

2. **Install VS Code Extensions (First-Time Only):**

   - Install and activate [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions in Visual Studio Code.

3. **Install Dependencies:**

   - Execute the following command to install the project dependencies:
     ```sh
     pnpm install
     ```

### ✅ Installation Complete!

---

<a name="how-to-use-devkit"></a>

# 🚀 How to use DevKit

Understanding the structure of the Webflow DevKit template is crucial for a seamless development experience.

<a name="project-folders"></a>

## 📂 Project Folders

Here’s a guide to help you navigate through the key directories and utilize them effectively:

### Source Directory

The `src` folder serves as the primary workspace for your project, housing all the JavaScript files, CSS files, and modules necessary for your Webflow site.

### Files Folder

Located within the src directory, the `files` folder is your primary working area designated for housing all your main JavaScript and CSS files for the project. For example `home.js`, `home.css`, `about.js`, `contact.js`, and so forth.

Additionally, you can create any global files such as `global.js`, `global.css`, `analytics.js`, etc. in the same Files folder, if you wish to execute certain scripts or invoke specific modules across all pages of your website. The actual scope of each file (i.e. page-specific versus global) will depend on where it is imported in Webflow (see [Importing Scripts in Webflow](#importing-scripts-in-webflow)).

### Modules Folder

Adjacent to the files folder, the `modules` directory is intended for smaller, reusable script segments. Examples of files you might store here include:

- `greet.js`: A simple module to greet users.
- `mirror-click.js`: A helper function to mirror click events in Webflow, useful across various sections and pages.
- `animations.js`: A collection of animation functions to enhance your site's interactivity.

These modular script files can be effortlessly imported into any of your page-specific script files. This practice not only keeps your codebase tidy but also fosters a modular development approach, making your code more maintainable and scalable.

By adhering to this structure, you ensure a well-organized and efficient development environment, paving the way for a smoother integration of JavaScript functionalities and CSS styles into your Webflow projects.

<a name="building-testing-in-development"></a>

## 🧑‍💻 Building & Testing in Development

As you embark on the journey of developing JavaScript and CSS functionality within the "files" and "modules" directories, integrating testing into your workflow is paramount. Conducting tests in a development setting is imperative and should proceed hand-in-hand with the coding phase. To facilitate this, run a local development server and integrate your scripts into your Webflow staging domain. Stay alert for any anomalies or errors, utilizing the available debugging tools to rectify issues as they arise. This continuous loop of coding, testing, and debugging is crucial for cultivating a stable and trustworthy codebase.

### Running the Development Server

To build and initiate the development server, execute:

```sh
pnpm dev
```

The development server facilitates **live reloading** on save, providing real-time feedback on your changes and significantly expediting the development and debugging processes.

Furthermore, the development server is enhanced with **sourcemaps**, which are invaluable for debugging. Sourcemaps preserve the visibility of your initial code structure, even when inspecting your Webflow project. This feature is instrumental in tracing back to the origins of imported modules by referencing individual files, rather than navigating through bundled or minified code.

If your project incorporates **multiple DevKit templates** and you intend to run several local servers simultaneously, it’s necessary to assign unique port numbers to each. To configure this:

- Open the `server.js` file located in the `bin` folder.
- Locate the line `const PORT = 3000;`.
- Modify the port number (3000) to an alternative number (e.g., 3001) to distinguish each template’s local server.

By doing this, you enable the concurrent running of distinct local servers, each serving project files from a different template, all while avoiding port conflicts.

<a name="pre-commit-hooks"></a>

## 🔒 Pre-commit Hooks

Webflow DevKit includes automatic code quality enforcement through pre-commit hooks powered by Husky and lint-staged. This ensures consistent code formatting and catches linting errors before they reach your repository.

### How It Works

When you commit code, the following happens automatically:

1. **Prettier** formats your JavaScript and CSS files in the `src/` directory
2. **ESLint** checks for and auto-fixes common issues
3. **Commit is blocked** if any ESLint errors are found
4. **Auto-fixed files** are automatically staged and included in the commit

### What Gets Checked

- **Files**: Only files in `src/**/*.{js,css}` are processed
- **Formatting**: Prettier ensures consistent code style
- **Linting**: ESLint catches errors and auto-fixes when possible
- **Performance**: Only staged files are checked (fast commits)

### Benefits

- **Automatic formatting**: No need to manually run Prettier
- **Error prevention**: Catches issues before they reach CI/CD
- **Team consistency**: Everyone gets the same code style
- **Editor agnostic**: Works regardless of your editor or extensions
- **Fast**: Only processes files you're actually committing

### Troubleshooting

If a commit is blocked due to linting errors:

1. **Check the error message** in your terminal
2. **Fix the issues** manually in your editor
3. **Stage the fixes** with `git add`
4. **Commit again** - the hooks will re-run

The pre-commit hooks are automatically set up when you run `pnpm install` thanks to the `prepare` script in package.json.

<a name="importing-scripts-in-webflow"></a>

## ⤵️ Importing Scripts in Webflow

DevKit offers **two methods** to import your JavaScript and CSS files into your Webflow project:

### 1️⃣ Traditional Method

During the operation of a local server (via `pnpm dev` or `pnpm prod` mentioned later), DevKit conveniently logs the script tags for all JavaScript and CSS files situated in the src folder. These scripts, along with their imported modules and source maps, are subsequently exported to the dev folder and served directly from this location.

**Logged script tags example:**

```
=== JS Scripts: === (Before </body> tag)

 <script src="http://localhost:3000/about.js" defer></script>

 <script src="http://localhost:3000/global.js" defer></script>

 <script src="http://localhost:3000/home.js" defer></script>

=== CSS Scripts: === (Inside <head> tag)

 <link rel="stylesheet" href="http://localhost:3000/home.css">
```

Integration steps:

1. **Page Styles:** Manually copy the required `<link>` tag/s and paste them into the designated Webflow page, inside the `<head>` tag.
2. **Page Scripts:** Manually copy the required `<script>` tag/s and paste them into the designated Webflow page, either before the closing `</body>` tag or inside the `<head>` tag (thanks to the defer attribute, both options work seamlessly).
3. **Global Styles:** For styles intended to be global, add the respective `<link>` tag/s in the Webflow site’s global settings, insice the `<head>` tag.
4. **Global Scripts:** For scripts intended to be global, add the respective `<script>` tag/s in the Webflow site’s global settings, either in the closing `</body` tag or the `head` tag (thanks to defer).

⚠️ **Inefficiency of Traditional Method:** Transitioning from development to production necessitates manually replacing these script tags with their production counterparts, and reverting back for subsequent changes — a process that can become cumbersome over time. To address this shortfall, DevKit offers an improved automated method which handles the swtiching of the tags for you:

### 2️⃣ Automated Method (Recommended)

- Jump to [condensed version](#importing-scripts-in-webflow2) (experienced DevKit users)

DevKit offers a custom script import mechanism designed to streamline and automate the process of integrating JavaScript and CSS into your Webflow project. This approach eliminates the need for manual switching between script tags when moving from a development to a production environment, providing a smoother and more efficient workflow.

### Setup

**`Step 1` Main Settings:**

Add this script to your site’s **global** settings in the **`<head>`** tag. The script is designed to configure essential variables for your project: the path to your npm package, the development mode toggle, and the local port number. These variables are crucial for script loader functions and other development processes across your site.

```
<!-- RD® Webflow DevKit / Main Settings -->
<script>
window.npmPath = "@reform-digital/sample-project@1.0.0"; // Update this once you have shipped to npm.
window.devMode = true; // Change to false in production
window.localPort = 3000; // Also change in bin/localport.js in VS Code
</script>
```

**_Main Settings Configurations:_**

- **NPM Path:** The Main Settings script includes a default `npmPath` that serves as a placeholder during the development phase. Initially, the template is configured to bypass this sample project path, so there's no immediate need to alter it during development. Once your project is ready for deployment and you've published your package to npm, you should update the `npmPath` variable to your own npm package path "@your-npm-username/your-package-name@version" to auto-direct the script and style loaders to your live production files via jsDelivr.
- **Dev Mode:** The `devMode` variable is a boolean that controls whether the development mode is active (**true**) or inactive (**false**). When `devMode` is `true` (development mode), the integrated script-loader and style-loader will first check for a local server instance initiated by either `pnpm dev` or `pnpm prod` within VS Code. If a local server is found, it serves the site files directly from there, allowing for real-time testing and development—this local version is only visible to you, while other visitors continue to access the production files. In the absence of a local server, the loaders will fall back to the production version, fetching files via jsDelivr. Furthermore, devMode enables detailed console logging for both local and npm file requests, aiding in the debugging process and clarifying which file sources are being rendered in your local browser. Conversely, when `devMode` is set to `false`, it signifies that the site is in its production phase. The loaders will then bypass the local server check and directly load files from npm to optimize performance. Console logs related to devMode activities are also disabled in production mode to maintain a clean and performance-focused environment.
- **Local Port:** The `localPort` setting specifies the port number on which your local server is running. The default port is **3000** but can be altered to suit your needs, such as when running multiple local servers simultaneously. Adjust the `localPort` value in the main settings to your preferred port to direct the script-loader and style-loader to the correct local server. Ensure this change is also mirrored in the Webflow DevKit template within VS Code by modifying the file at `/bin/localport.js` to match otherwise the template will not connect accordingly.

**`Step 2` Style Loader:**

Add this script to your site’s **global** settings in the **`<head>`** tag. It enables the dynamic loading of styles based on the development server’s status.

```
<!-- RD® Webflow DevKit / Style Loader -->
<script src="https://cdn.jsdelivr.net/npm/@reform-digital/webflow-devkit-utils@1.1.0/prod/style-loader.js"></script>
```

**`Step 3` Script Loader:**

Add this script to your site’s **global** settings before the **`</body>`** closing tag. It enables the dynamic loading of scripts based on the development server’s status.

```
<!-- RD® Webflow DevKit / Script Loader -->
<script src="https://cdn.jsdelivr.net/npm/@reform-digital/webflow-devkit-utils@1.1.0/prod/script-loader.js"></script>
```

### Import Files

**`Global` Styles:**

If you have any global CSS files that should be loaded across all pages, import them by adding the following script to your site’s **global** settings in the **`<head>`** tag, under the Style Loader script. Add and remove file names as required (the globalStyles variable is a comma-separated array).

```
<!-- RD® Webflow DevKit / Global Styles -->
<script>
const globalStyles = ["global.css", "animation.css"];
loadWebflowStylesheets(globalStyles, npmPath);
</script>
```

**`Global` Scripts:**

If you have any global JavaScript files that should be loaded across all pages, import them by adding the following script to your site’s **global** settings before the **`</body>`** closing tag, under the Script Loader script. Add and remove file names as required (the globalScripts variable is a comma-separated array).

```
<!-- RD® Webflow DevKit / Global Scripts -->
<script>
const globalScripts = ["global.js", "analytics.js"];
loadWebflowScripts(globalScripts, npmPath);
</script>
```

**`Page` Styles:**

If you have any page-specific CSS files that should be loaded on a specific page, import them by adding the following script to your **page** settings in the **`<head>`** tag.

```
<!-- RD® Webflow DevKit / Page Styles -->
<script>
const pageStyles = ["home.css"];
loadWebflowStylesheets(pageStyles, npmPath);
</script>
```

For the About page for example, if you have created an `about.css` in your src folder, you would replace `const pageStyles = ["home.css"];` with `const pageStyles = ["about.css"];`

**`Page` Scripts:**

If you have any page-specific JavaScript files that should be loaded on a specific page, import them by adding the following script to your **page** settings before the **`</body>`** closing tag.

```
<!-- RD® Webflow DevKit / Page Scripts -->
<script>
const pageScripts = ["home.js"];
loadWebflowScripts(pageScripts, npmPath);
</script>
```

For the About page for example, if you have created an `about.js` in your src folder, you would replace `const pageScripts = ["home.js"];` with `const pageScripts = ["about.js"];`

### How It Works

Once you have shipped your production files to npm (see [Shipping to NPM](#shipping-to-npm)) and updated the `npmPath` in the global script, the script loader automatically loads your production files located in npm via jsDelivr.

When you're ready to test new changes, running a local development server using `pnpm dev` (or a production testing server using `pnpm prod` as oulined in next section) triggers the script loader to temporarily deactivate the live production scripts from npm on your local browser. This enables you to seamlessly work and test in a local environment without affecting what the public sees on your live website.

This transition is seamless and requires no manual intervention, allowing you to focus on development and testing without worrying about the underlying script management. Once you're done and shut down your local server, your browser automatically reverts to serving the live production files, ensuring a consistent and error-free user experience.

By adopting the Automated Method with DevKit’s custom script import mechanism, you are choosing a workflow that is not only more efficient but also less prone to human error, ensuring a smoother development experience and a more reliable live website.

<a name="building-testing-in-production"></a>

## 🧑‍💻 Building & Testing in Production

When your files and modules have been extensively tested and are stable in the development environment, it’s time to shift your focus to the production environment for further testing and validation.

### Running the Production Server

To assess your code’s performance and security in a production-like setting, execute:

```sh
pnpm prod
```

Executing this command will bundle, minify, and obfuscate your code, aiming to boost performance and security. It’s crucial to note that the production server does not support live reloading. This is a deliberate design choice, as the production environment is not intended for real-time code adjustments. Instead, its primary purpose is to confirm that the production files are correctly bundled and to validate that they function as expected before being deployed to NPM for live production use.

### Building Without Running a Server

For scenarios where you wish to build the production files without launching the production server, utilize:

```sh
pnpm build
```

Ensuring the built files function properly in a production-like setting is essential. This step verifies their performance and readiness for deployment, confirming that they are fully prepared for live production use.

<a name="shipping-to-npm"></a>

## 🚀 Shipping to NPM

After thorough development and testing of your code in both the development and production environments, the next pivotal step is to ship your code to NPM. This is a crucial phase as it involves packaging your code and making it accessible for live production use. We've built a seamless mechanism for shipping your code to NPM.

### Update the README.md File

Before running the ship command, ensure you have updated the README.md file. If this is not done, then the current DevKit README, which you are reading now, will be added to NPM. This could create confusion as it does not provide information specific to your package or project. Instead, your README should clearly outline the purpose, installation, usage, and any other important details related to your package or project.

### Run the Ship Command

To build and initiate the development server, execute:

```
pnpm ship
```

Note: If you are using the GitHub extension for VS Code, you might receive the message "GitHub for VS Code is requesting additional permissions”. If so, review the permissions requested by the app and grant the necessary permissions.

### Pre-shipment Checklist

Executing the `pnpm ship` command starts a 9-step pre-shipment checklist. It ensures that the NPM destination, package description, change type (major, minor, patch), and other package details are correctly set.

The script will interactively guide you through the following:

- Confirming the destination package name. You can edit it if necessary.
- Confirming the package description. Again, you can edit this if required.
- Confirming the author. Similarly, you can edit this if required.
- Confirming the package keywords. Again, you can edit or omit this if required.
- Confirming the license type. Similarly, you can edit this if required.
- Choosing the type of version update (patch, minor, major). For initial shipments, the version will be set to 1.0.0.
- Describing the changes in this version, which will be appended to the CHANGELOG.md file.
- Confirming that the README.md file has been updated.
- Final confirmation before proceeding.

After you confirm, the script will:

- Update the package.json with the new version, name, description, and authors.
- Check if the version tag exists locally or remotely and handle it.
- Commit the changes and tag the commit with the new version.
- Trigger the CI/CD Pipeline.

### CI/CD Pipeline

- **Bundling and Optimization:** The CI/CD pipeline automates the process of bundling your code. It applies necessary optimizations and minifications.
- **GitHub Push:** The code, along with its shipment settings and the updated version number, is then pushed to your GitHub repository.
- **GitHub Action - Ship to NPM:** After the push to GitHub, a predefined GitHub Action is triggered. This action ensures your package is correctly published under your NPM account. It handles tasks like authentication with NPM and publishing.

### Post-Shipment Steps

After successful shipment to NPM, depending on the script tag import method you've set up in your Webflow project (see [Importing Scripts in Webflow](#importing-scripts-in-webflow)), follow the steps below:

#### Automated Method (Recommended):

Update npmPath: In your Webflow project, locate the DevKit "Main Settings" script in global `<head>` section. Update the npmPath variable with your shipped NPM package path:

```
const npmPath = "@your-npm-username/your-package-name@version";
```

This directs the script loader to fetch the production files directly from your NPM package when DevMode is off (set to "false") during production. When DevMode is on (set to "true") during development, the script loader tries to load the scripts from your local development server when active and auto-switches to your NPM files when the local server is off. Replace `@your-npm-username/your-package-name@version` with the appropriate values. While you can omit @version to always fetch the latest version of the script, doing so may lead to caching issues if the CDN or browsers cache an older version of the script. Specifying the exact version helps to ensure that users always receive the correct version of your script. Refer to [Addressing Version Caching](#addressing-version-caching) for ways to mitigate these issues.

#### Traditional Method:

If you're using the traditional method for script tags in Webflow, update your script tags to the following format:

```
<script src="https://cdn.jsdelivr.net/npm/@your-npm-username/your-package-name@version/your-filename.js"></script>
```

And your CSS files to:

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@your-npm-username/your-package-name@version/your-filename.css">
```

Replace `@your-npm-username/your-package-name@version/your-filename.js` or `.css` with the appropriate values. While you can omit @version to always fetch the latest version of the script, doing so may lead to caching issues if the CDN or browsers cache an older version of the script. Specifying the exact version helps to ensure that users always receive the correct version of your script. Refer to [Addressing Version Caching](#addressing-version-caching) for ways to mitigate these issues.

### Verification

To ensure everything is in order:

- Visit your live website.
- Open your browser's developer tools and inspect the network requests.
- Confirm that the JavaScript and CSS files are being sourced from jsDelivr.

<a name="addressing-version-caching"></a>

## 🔄 Addressing Version Caching

When deploying updates to your scripts via NPM and serving them through jsDelivr for your Webflow project, understanding how versioning and caching work together is crucial to ensure that your users always receive the latest version of your scripts.

### Using @latest for Versioning

If you choose to use the @latest tag (or omit the version number altogether), you are instructing jsDelivr to serve the latest version of your script. This is perfectly fine for your initial release, however, for subsequent version releases, this approach can lead to caching challenges:

- **CDN Caching:** jsDelivr, like other CDNs, caches content across its global network of servers to reduce latency and improve performance. When a new version of your script is published, it might take some time for the CDN to update the cached content across all of its servers.
- **Browser Caching:** Browsers also cache content locally to improve page load times. If a user has recently visited your site, their browser might have cached the old version of your script, and it could take some time before the browser checks for an updated version.

### Manually Purging CDN Cache

To expedite the process of updating cached content on jsDelivr, you can manually purge the cache for your script files. Visit [jsDelivr’s Purge Tool](https://www.jsdelivr.com/tools/purge) and enter the URLs of your script files to clear the cache. However, this process can be time-consuming, especially if you have multiple script files, and it only addresses CDN caching—not browser caching.

### Manually Clearing Browser Cache

While you can clear your own browser's cache or perform a hard reset (Shift + Refresh) to fetch the latest version of your scripts (provided that the CDN cache has already been resolved or purged), there is no simple way to force this action on your visitors' browsers. If they have visited your site recently and have a cached version of your scripts, they might not see the updates until their browser's cache expires and fetches the new version.

### Using Specific Versions to Avoid Caching Issues

To circumvent both CDN and browser caching issues, the recommended approach is to use specific version numbers in your imported script tags:

- In the Automated script import method (recommended), under `npmPath` you would add `"@your-npm-username/your-package-name@version"`
- In the Traditional script import method, for each script tag `src` you would add `"https://cdn.jsdelivr.net/npm/@your-npm-username/your-package-name@version/your-filename.js"`
- Similarly, for each style tag `href` you would add `"https://cdn.jsdelivr.net/npm/@your-npm-username/your-package-name@version/your-filename.css"`.

By explicitly specifying the version number, you ensure that both the CDN and browsers treat the updated script as a completely new file, bypassing the cache and delivering the latest version to your users. This approach is crucial when immediate updates are required, and you cannot afford to wait for caches to expire.

### Conclusion

Understanding how CDN and browser caching work can help you make informed decisions about how to version your scripts and ensure that your users always have access to the latest features and fixes. While using specific versions requires more management, it provides the reliability needed for critical updates. For less critical updates, using @latest might be a convenient option, but be prepared to manually purge the CDN cache and educate your users on clearing their browser's cache if necessary.

<a name="working-with-branches"></a>

## 🔀 Working with Branches & Contributing

Developing a project with a structured approach to version control can significantly improve the efficiency and clarity of the development process. Below, we outline two common scenarios: working solo and collaborating with multiple developers.

### Single Developer Workflow

#### Initial Development:

All development work can be done directly in the main branch until the first version is ready to be released.

#### Creating a Dev Branch:

After the initial release, create a `dev` branch from main for ongoing development using GitHub Desktop:

- Open GitHub Desktop and navigate to your repository.
- Click on the current branch at the top of the application to view all available branches.
- Choose “New branch”, name it "dev", and click “Create Branch”.
- Push the new branch to the remote repository by clicking on “Publish branch”.

#### Routine Development:

Ensure you are working in the `dev` branch. You can switch branches in GitHub Desktop by clicking on the current branch’s name and selecting the one you wish to switch to.
Your local files will now reflect the state of the `dev` branch. Note that this state is preserved even if you close and reopen GitHub Desktop.
Develop, commit your changes, and push your commits to the `dev` branch.

#### Stashing Changes:

If you need to switch branches but have uncommitted changes, GitHub Desktop will offer to stash your changes.
Stashing temporarily sets aside your changes, allowing you to switch branches and work on something else. When you’re ready, you can come back and apply your stashed changes.

#### Merging and Releasing:

Once you are ready to release a new version:

- Merge `dev` into `main` via a pull request on GitHub.
- Switch to the `main` branch in GitHub Desktop, pull the latest changes, and run `npm ship` to publish the new version to npm.

By following these steps, a single developer can maintain a streamlined development workflow while keeping the `main` branch stable. The `dev` branch serves as a space for ongoing development, with the ability to create and apply stashes as needed to manage concurrent tasks.

### Multi-Developer Collaboration Workflow

Collaborating with multiple developers requires a more structured approach to manage concurrent development activities and minimize conflicts.

#### 1. Setting Up Main and Dev Branches:

Ensure that both `main` and `dev` branches are set up in the repository, and if not, make sure to add a `dev` branch for the whole team to access.
All developers should clone the repository to their local machines using GitHub Desktop:

- Open GitHub Desktop.
- Go to “File” > “Clone Repository” and select the repository from the list.
- Choose the local path for the repository and click “Clone”.
- Run `pnpm install` to install project dependencies.

#### 2. Creating Feature Branches:

Each developer works on their specific feature or bug fix by creating a new branch from 'dev', also known as a **feature branch**.
In GitHub Desktop:

- Ensure you are on the `dev` branch.
- Click on the current branch at the top, select “New Branch”, name it according to the feature or fix you are working on, and click “Create Branch”.
- Publish the branch to the remote repository by clicking “Publish branch”.

#### 3. Development, Commit, Push:

Develop on your feature branch.
Commit your changes in GitHub Desktop:

- Enter a summary and description for your changes.
- Click “Commit to [your-branch-name]”.
- Push your commits to the remote repository by clicking “Push origin”.

#### 4. Collaboration and Code Review:

When a feature is complete:

- Open a pull request on GitHub to merge your branch back into `dev`.
- Team members review the code, suggest changes, and discuss implementations.
- After approval, **merge** the branch into `dev`.

#### 5. Syncing Changes:

To maintain consistency and minimize merge conflicts, all developers should regularly synchronize their local working branches with the remote repository, ensuring they have the latest changes from the dev branch. Here's how to do it using GitHub Desktop:

Fetch Changes from the Remote Repository:

- Open GitHub Desktop and navigate to your repository.
- Click “Fetch origin” to retrieve the latest changes from the remote repository. If there are new commits on the remote `dev` branch, GitHub Desktop will show an option to “Pull origin”. Click this button to update your local `dev` branch.

Merge Changes from `dev` to Your Feature Branch:

- Ensure you are on your feature branch. You can switch branches using the branch dropdown at the top of GitHub Desktop.
- Go to the “Branch” menu at the top and select “Merge into current branch…”.
- A list of branches will appear. Select `dev` from this list and click “Merge dev into [your-feature-branch]”.
- If there are any merge conflicts, resolve them in your preferred code editor.

Push Your Changes:

- Once the merge is complete and any conflicts are resolved, commit your changes.
- Push your changes to the remote repository to ensure that your feature branch on GitHub is up-to-date.

By following these steps, you ensure that your feature branch stays synchronized with the latest changes from `dev`, reducing potential issues when it's time to merge your feature back into the development branch.

#### 6. Adding Collaborators:

Project maintainers can add collaborators:

- Go to the repository on GitHub.
- Click “Settings” > “Manage access” > “Invite a collaborator”.

#### 7. Preparing for Release:

Once `dev` is stable and ready for release:

- Create a pull request to merge `dev` into main.
- Conduct a final review and merge the changes.

#### 8. Shipping to npm:

Switch to the `main` branch in GitHub Desktop:

- Fetch the latest changes by clicking “Fetch origin”.
- Pull the changes by clicking “Pull origin” (if there are new commits to pull).
- Run `npm ship` to publish the new version to npm.

### Conclusion

These workflows are designed to cater to different scales of development, ensuring code integrity and facilitating collaboration. The single developer workflow is straightforward and suited for smaller projects or the initial development phases. The multi-developer collaboration workflow, on the other hand, is robust and accommodates concurrent development activities, making it suitable for larger teams and more complex projects. This structure ensures that every developer's changes are isolated in their own feature branches, allowing for independent development, easy code review, and reduced merge conflicts.

<a name="condensed-guide-for-existing-devkit-users"></a>

# 🤏 Condensed Guide for Existing DevKit Users 😎

Once you've become a seasoned DevKit pro, you can skip the detailed Readme aimed at new users, and jump straight into this condensed guide instead:

## Table of Contents (Condensed Guide)

- [Installation](#installation2)
  - [Step 1: Setup Template](#step-1-setup-template2)
  - [Step 2: Setup Public SSH Key](#step-2-setup-public-ssh-key-first-time-only2)
  - [Step 3: Setup Private SSH Key](#step-3-setup-private-ssh-key-for-every-new-project2)
  - [Step 4: Setup NPM](#step-4-setup-npm2)
  - [Step 5: Setup Your Project](#step-5-setup-your-project2)
- [How to use DevKit](#how-to-use-devkit2)
  - [Building & Testing](#building-testing2)
  - [Pre-commit Hooks](#pre-commit-hooks2)
  - [Importing Scripts](#importing-scripts-in-webflow2)
  - [Shipping to NPM](#shipping-to-npm2)
  - [Addressing Version Caching](#addressing-version-caching2)
  - [Working with Branches & Contributing](#working-with-branches2)

<a name="installation2"></a>

## 🏁 Installation

<a name="step-1-setup-template2"></a>

### Step 1: Setup Template

- Click on "Use this template" in GitHub and clone as private repository.
- Open locally with GitHub Desktop and open project in Visual Studio Code.

<a name="step-2-setup-public-ssh-key-first-time-only2"></a>

### Step 2: Setup SSH Key Pair & Public Key (First-Time Only)

#### Check for Existing SSH Keys:

```
ls -al ~/.ssh
```

Look for files named `id_rsa.pub`, `id_ecdsa.pub`, or `id_ed25519.pub`. If such a file exists, you can skip the next steps and jump to "**Add public key to GitHub**" if you haven't already done so previously.

#### Generate SSH Key Pair:

```
Run ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

#### Add Key to SSH-Agent:

```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

#### Copy public key:

```
cat ~/.ssh/id_rsa.pub | pbcopy
```

Or manual copy:

```
cat ~/.ssh/id_rsa.pub
```

#### Add public key to GitHub:

Go to GitHub > Settings > SSH and GPG keys > New SSH key, paste key, and save.

<a name="step-3-setup-private-ssh-key-for-every-new-project2"></a>

### Step 3: Setup Private SSH Key (Per Project)

#### Copy private key:

```
cat ~/.ssh/id_rsa | pbcopy
```

Or manual copy:

```
cat ~/.ssh/id_rsa
```

Go to Repo > Settings > Secrets and variables > Actions > New repository secret.
Name it `SSH_TOKEN` and paste key content.

<a name="step-4-setup-npm2"></a>

### Step 4: Setup NPM

- (Optional) Create NPM Organization: Skip if not needed.
- Create NPM Granular Access Token: Generate a granular access token with read/write permissions, named descriptively.
- Configure Token Permissions: Select "Read and write" access and appropriate scope.
- Set Token Expiration: Choose 30-90 days (recommended: 30 days for regular rotation).
- Copy NPM Token: Ensure you've copied it; it's not retrievable later.
- Add Token to GitHub as Secret: In your project's GitHub settings, under Secrets and variables, add a new secret named `NPM_TOKEN` and paste the token.

<a name="step-5-setup-your-project2"></a>

### Step 5: Setup Your Project Setup

#### Install pnpm: (Skip if already installed)

```
npm install -g pnpm
```

#### Install dependencies:

```
pnpm install
```

<a name="how-to-use-devkit2"></a>

# 🚀 How to Use DevKit

<a name="building-testing2"></a>

## 🧑‍💻 Building & Testing

### Run a Local Development Server:

```
pnpm dev
```

### Run a Local Production Server:

```
pnpm prod
```

<a name="pre-commit-hooks2"></a>

## 🔒 Pre-commit Hooks

### Automatic Code Quality

Pre-commit hooks automatically format and lint your code before commits:

- **Prettier** formats JavaScript and CSS files in `src/`
- **ESLint** catches and auto-fixes errors
- **Commit blocked** if ESLint errors are found
- **Auto-setup** when running `pnpm install`

### Troubleshooting

If commit is blocked:
1. Fix the linting errors shown in terminal
2. Stage fixes with `git add`
3. Commit again

<a name="importing-scripts-in-webflow2"></a>

## ⤵️ Importing Scripts

### 1️⃣ Traditional Method:

- Operation: Run your local server using pnpm dev or pnpm prod.
- Script Logging: DevKit logs script tags for JavaScript and CSS files from the src folder.
- Integration: Manually copy and paste script tags to your Webflow pages or global settings, being mindful to switch between development and production tags as needed.

### 2️⃣ Automated Method (Recommended):

### Core DevKit Scripts (Global):

#### `Main Settings`: Add in global `<head>` tag

```
<!-- RD® Webflow DevKit / Main Settings -->
<script>
window.npmPath = "@reform-digital/sample-project@1.0.0"; // Update this once you have shipped to npm.
window.devMode = true; // Change to false in production
window.localPort = 3000; // Also change in bin/localport.js in VS Code
</script>
```

#### `Style-Loader`: Add in global `<head>` tag

```
<!-- RD® Webflow DevKit / Style Loader -->
<script src="https://cdn.jsdelivr.net/npm/@reform-digital/webflow-devkit-utils@1.1.0/prod/style-loader.js"></script>
```

#### `Script-Loader`: Add before global `</body>` closing tag

```
<!-- RD® Webflow DevKit / Script Loader -->
<script src="https://cdn.jsdelivr.net/npm/@reform-digital/webflow-devkit-utils@1.1.0/prod/script-loader.js"></script>
```

### Project Code (Page level):

#### Page `Scripts`: Add before page `</body>` closing tag

```
<!-- RD® Webflow DevKit / Page Scripts -->
<script>
const pageScripts = ["home.js"];
loadWebflowScripts(pageScripts, npmPath);
</script>
```

#### Page `Styles`: Add in page `<head>` tag

```
<!-- RD® Webflow DevKit / Page Styles -->
<script>
const pageStyles = ["home.css"];
loadWebflowStylesheets(pageStyles, npmPath);
</script>
```

### Project Code (Global):

#### Global `Scripts`: Add before global `</body>` closing tag, under Script Loader.

```
<!-- RD® Webflow DevKit / Global Scripts -->
<script>
const globalScripts = ["global.js", "analytics.js"];
loadWebflowScripts(globalScripts, npmPath);
</script>
```

#### Global `Styles`: Add in global `<head>` tag, under Style Loader.

```
<!-- RD® Webflow DevKit / Global Styles -->
<script>
const globalStyles = ["global.css", "animation.css"];
loadWebflowStylesheets(globalStyles, npmPath);
</script>
```

<a name="shipping-to-npm2"></a>

## 🚀 Shipping to NPM

```
pnpm ship
```

If you are using the GitHub extension for VS Code, grant the necessary permissions if prompted.

### Post-Shipment Steps:

#### Automated:

Update `npmPath` with your own path in the global `<head>`.

#### Traditional:

Replace local script tags located in global and page-specific `</body>` to:

```
<script src="https://cdn.jsdelivr.net/npm/@your-npm-username/your-package-name@version/your-filename.js"></script>
```

Replace local style tags in global and page-specific `<head>` to:

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@your-npm-username/your-package-name@version/your-filename.css">
```

<a name="addressing-version-caching2"></a>

## 🔄 Addressing Version Caching

### @latest Versioning

- Initial Release: @latest (or omitting @version) is ok for initial release.
- Subsequent Releases: @latest might lead to outdated content due to CDN and browser caching.

### Cache Management

- CDN Cache: Manually purge via [jsDelivr’s Purge Tool](https://www.jsdelivr.com/tools/purge).
- Browser Cache: Educate users; no direct control, can only hard refresh or clear own browser cache.

### Use Specific Versions to Prevent Caching Issues

- Automated Import: npm path `"@your-npm-username/your-package-name@version"`
- Traditional Import: src path `"https://cdn.jsdelivr.net/npm/@your-npm-username/your-package-name@version/your-filename.js"`

<a name="working-with-branches2"></a>

## 🔀 Working with Branches & Contributing

### Single Developer Workflow

- **Initial Development:** Work directly in main branch.
- **Creating a Dev Branch:** After initial release, create a dev branch.
- **Routine Development:** Work in dev, commit changes, push commits.
- **Merging and Releasing:** Merge dev into main, publish to npm.

### Multi-Developer Collaboration Workflow

- **Setting Up Main and Dev Branches:** Ensure main and dev branches are set up.
- **Creating Feature Branches:** Developers create feature branches from dev.
- **Development, Commit, Push:** Work on feature, commit, and push.
- **Collaboration and Code Review:** Open pull requests, review code, merge into dev.
- **Syncing Changes:** Regularly fetch and merge changes from dev to avoid conflicts.
- **Adding Collaborators:** Project maintainers can add collaborators through GitHub settings.
- **Preparing for Release:** Merge dev into main, prepare for npm release.
- **Shipping to npm:** Switch to main, fetch latest, pull changes, publish to npm.

### Conclusion

- Single developer workflow for smaller projects or initial phases.
- Multi-developer collaboration workflow for larger teams and complex projects.

# Made with 💜 by Reform Digital®
