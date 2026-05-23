// Edit this file to update this part of the simulator data.
window.deviceGuideTutorials = window.deviceGuideTutorials || {};
window.deviceGuideTutorials.default = [
  {
    "id": "insert-sim",
    "title": "Insert SIM",
    "duration": "2 min",
    "summary": "Place a nano SIM into the device tray safely.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Power off",
        "instruction": "Turn the device off before opening the SIM tray.",
        "screen": "power",
        "target": "power"
      },
      {
        "title": "Open tray",
        "instruction": "Use the tray pin to eject the SIM tray carefully.",
        "screen": "sim-tray",
        "target": "tray"
      },
      {
        "title": "Place SIM",
        "instruction": "Place the SIM in the tray and slide it back into the device.",
        "screen": "sim-ready",
        "target": "ready"
      }
    ]
  },
  {
    "id": "mobile-data",
    "title": "Enable Mobile Data",
    "duration": "2 min",
    "summary": "Turn cellular data on from quick settings.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open quick settings",
        "instruction": "Swipe down from the top of the screen to open quick settings.",
        "screen": "quick-settings",
        "target": "data"
      },
      {
        "title": "Find data toggle",
        "instruction": "Look for Mobile Data or Cellular Data.",
        "screen": "quick-settings",
        "target": "data"
      },
      {
        "title": "Turn it on",
        "instruction": "Tap the toggle and wait for the network indicator to appear.",
        "screen": "quick-settings-on",
        "target": "data"
      }
    ]
  },
  {
    "id": "screenshot",
    "title": "Take a Screenshot",
    "duration": "1 min",
    "summary": "Capture the current screen with hardware buttons.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open the screen",
        "instruction": "Navigate to the screen you want to capture.",
        "screen": "home",
        "target": "screen"
      },
      {
        "title": "Press buttons",
        "instruction": "Press Power and Volume Down together for one second.",
        "screen": "screenshot",
        "target": "buttons"
      },
      {
        "title": "Find screenshot",
        "instruction": "Open Photos or Gallery to view the saved screenshot.",
        "screen": "gallery",
        "target": "saved"
      }
    ]
  },
  {
    "id": "software-update",
    "title": "Update Software",
    "duration": "6 min",
    "summary": "Check for and install an available system update.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open Settings",
        "instruction": "Connect to Wi-Fi, then open Settings.",
        "screen": "home",
        "target": "settings"
      },
      {
        "title": "Check updates",
        "instruction": "Search for Software Update and choose Download and install.",
        "screen": "software-update",
        "target": "check"
      },
      {
        "title": "Install",
        "instruction": "Follow the prompts and keep the device charged during installation.",
        "screen": "install-update",
        "target": "install"
      }
    ]
  },
  {
    "id": "factory-reset",
    "title": "Factory Reset",
    "duration": "8 min",
    "summary": "Erase the device after backing up important information.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Back up first",
        "instruction": "Back up your photos, contacts, and important files before continuing.",
        "screen": "backup",
        "target": "backup"
      },
      {
        "title": "Open reset menu",
        "instruction": "Go to Settings and search for Factory Reset.",
        "screen": "reset-options",
        "target": "factory"
      },
      {
        "title": "Confirm erase",
        "instruction": "Read the warning carefully, then confirm only when ready.",
        "screen": "factory-reset",
        "target": "erase"
      }
    ]
  },
  {
    "id": "troubleshooting",
    "title": "Basic Troubleshooting",
    "duration": "4 min",
    "summary": "Try common fixes for app, signal, battery, and connectivity issues.",
    "type": "Guide",
    "steps": [
      {
        "title": "Restart",
        "instruction": "Restart the device and check if the issue is resolved.",
        "screen": "power",
        "target": "restart"
      },
      {
        "title": "Check signal",
        "instruction": "Confirm signal, Wi-Fi, battery, and storage are healthy.",
        "screen": "quick-settings",
        "target": "signal"
      },
      {
        "title": "Update apps",
        "instruction": "Update apps and system software, then test again.",
        "screen": "app-store",
        "target": "updates"
      }
    ]
  }
];
