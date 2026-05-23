# DeviceGuide Simulator

An original, static device simulator starter project inspired by the idea of interactive mobile support guides. It does not use Verizon branding, logos, exact copy, or copyrighted assets.

## Features

- Home page with search, brand cards, and popular devices
- Brand listing page with supported and coming soon states
- Device list page with model filtering
- Simulator/tutorial page with phone mockup, tutorial tabs, step counter, highlighted steps, and next/previous controls
- Coming Soon page for unsupported brands or future models
- Sample data for Vivo, Xiaomi, Redmi, Poco, Samsung, Realme, Oppo, Apple / iPhone, Motorola, OnePlus, and iQOO
- HTML, CSS, and JavaScript only
- Responsive layout for mobile, tablet, and desktop

## Folder Structure

```text
deviceguide-simulator/
+-- index.html
+-- brands/
|   +-- samsung.html
|   +-- apple.html
|   +-- ...
+-- css/
|   +-- style.css
+-- js/
|   +-- data/
|   |   +-- brands.js
|   |   +-- devices/
|   |   |   +-- samsung.js
|   |   |   +-- apple.js
|   |   |   +-- ...
|   |   +-- tutorials/
|   |       +-- samsung.js
|   |       +-- iphone.js
|   |       +-- default.js
|   +-- data.js
|   +-- phone-renderer.js
|   +-- main.js
+-- README.md
```

## How To Run

Open `index.html` in a browser. No backend or package installation is required.

For a local server, you can use VS Code Live Server or run:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Edit Data

Most edits now happen in smaller files:

- Add or edit brands in `js/data/brands.js`
- Add Samsung models in `js/data/devices/samsung.js`
- Add iPhone models in `js/data/devices/apple.js`
- Add other brand models in their matching file under `js/data/devices/`
- Add Samsung tutorial steps in `js/data/tutorials/samsung.js`
- Add iPhone tutorial steps in `js/data/tutorials/iphone.js`
- Add shared Android tutorials in `js/data/tutorials/default.js`
- Edit phone frames and screen drawings in `js/phone-renderer.js`
- Edit navigation, search, and page rendering in `js/main.js`

`js/data.js` only combines the smaller data files. You usually do not need to edit it.

## Brand Pages

Each brand has a simple entry page in `brands/`.

Examples:

```text
brands/samsung.html
brands/apple.html
brands/oneplus.html
```

These pages open the main app directly to that brand's device list. This keeps brand links easy to share while still reusing the same design and JavaScript.

## Create The Project In VS Code

1. Create a folder named `deviceguide-simulator`.
2. Open VS Code.
3. Choose `File > Open Folder`.
4. Select the project folder.
5. Create these files and folders:
   - `index.html`
   - `css/style.css`
   - `js/data.js`
   - `js/main.js`
   - `README.md`

## Initialize Git

Install Git first if the `git` command is not recognized:

- Download Git from <https://git-scm.com/downloads>
- Restart VS Code after installation

Then run:

```bash
git init
git add .
git commit -m "Initial device simulator starter"
```

## Create A GitHub Repository

1. Go to <https://github.com/new>.
2. Enter a repository name, for example `deviceguide-simulator`.
3. Choose Public or Private.
4. Do not add a README from GitHub because this project already has one.
5. Click `Create repository`.

## Push The Project

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/deviceguide-simulator.git
git push -u origin main
```

## Partner Clone Steps

Your partner can run:

```bash
git clone https://github.com/YOUR_USERNAME/deviceguide-simulator.git
cd deviceguide-simulator
code .
```

## Branch Workflow For Two Developers

Use one branch per feature or fix.

Developer A:

```bash
git checkout main
git pull
git checkout -b feature/search-improvements
```

Developer B:

```bash
git checkout main
git pull
git checkout -b feature/new-device-data
```

After editing:

```bash
git status
git add .
git commit -m "Add new device data"
git push -u origin feature/new-device-data
```

Then open a Pull Request on GitHub and merge it after review.

## Daily Git Commands

```bash
git status
git pull
git checkout -b feature/my-task
git add .
git commit -m "Describe the change"
git push -u origin feature/my-task
```

After a Pull Request is merged:

```bash
git checkout main
git pull
git branch -d feature/my-task
```

## Suggested Collaboration Rules

- Keep `main` stable.
- Do new work in feature branches.
- Pull latest `main` before starting each day.
- One developer can focus on UI and layout.
- The other developer can focus on data, tutorials, and search behavior.
- Review Pull Requests before merging.
- Avoid editing the same file at the same time when possible.

## Next Improvements

- Add real SVG device illustrations created in-house
- Add more tutorials per model
- Add URL hash routing for shareable simulator links
- Add favorites or recently viewed devices
- Add keyboard support for tutorial step navigation
