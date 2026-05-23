// Edit this file to update this part of the simulator data.
window.deviceGuideTutorials = window.deviceGuideTutorials || {};
window.deviceGuideTutorials["iphone-15"] = [
  {
    "id": "ios-reset-network",
    "title": "Reset Network Settings",
    "duration": "5 min",
    "summary": "Reset Wi-Fi, cellular, and VPN settings on an iPhone-style interface.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open Settings",
        "instruction": "From the Home Screen, tap Settings.",
        "screen": "ios-home",
        "target": "settings"
      },
      {
        "title": "Tap General",
        "instruction": "Scroll down and tap General.",
        "screen": "ios-settings",
        "target": "general"
      },
      {
        "title": "Tap Transfer or Reset iPhone",
        "instruction": "Scroll to the bottom and tap Transfer or Reset iPhone.",
        "screen": "ios-general",
        "target": "transfer"
      },
      {
        "title": "Tap Reset",
        "instruction": "Tap Reset at the bottom of the screen.",
        "screen": "ios-transfer",
        "target": "reset"
      },
      {
        "title": "Tap Reset Network Settings",
        "instruction": "Choose Reset Network Settings from the options.",
        "screen": "ios-reset-sheet",
        "target": "network"
      },
      {
        "title": "Confirm",
        "instruction": "Enter the passcode if asked, then confirm the reset.",
        "screen": "ios-confirm",
        "target": "confirm"
      }
    ]
  },
  {
    "id": "ios-hotspot",
    "title": "Set Up Personal Hotspot",
    "duration": "4 min",
    "summary": "Turn on Personal Hotspot and share the iPhone data connection.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open Settings",
        "instruction": "Tap Settings from the Home Screen.",
        "screen": "ios-home",
        "target": "settings"
      },
      {
        "title": "Tap Personal Hotspot",
        "instruction": "Open Personal Hotspot.",
        "screen": "ios-settings",
        "target": "hotspot"
      },
      {
        "title": "Allow others to join",
        "instruction": "Turn on Allow Others to Join.",
        "screen": "ios-hotspot",
        "target": "toggle"
      },
      {
        "title": "Share password",
        "instruction": "Use the displayed Wi-Fi password to connect another device.",
        "screen": "ios-hotspot",
        "target": "password"
      }
    ]
  }
];
