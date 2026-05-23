// Edit this file to update this part of the simulator data.
window.deviceGuideTutorials = window.deviceGuideTutorials || {};
window.deviceGuideTutorials["samsung-s24"] = [
  {
    "id": "reset-network",
    "title": "Reset Network Settings",
    "duration": "5 min",
    "summary": "Reset saved Wi-Fi, Bluetooth, and cellular network preferences when connection problems continue.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open the notification panel",
        "instruction": "From the Home screen, swipe down from the top edge to open the notification panel.",
        "screen": "quick-settings",
        "target": "gear"
      },
      {
        "title": "Tap the Settings icon",
        "instruction": "Tap the Settings icon in the upper right corner.",
        "screen": "quick-settings",
        "target": "gear"
      },
      {
        "title": "Scroll to General management",
        "instruction": "In Settings, scroll until General management is visible.",
        "screen": "settings-list",
        "target": "general"
      },
      {
        "title": "Tap General management",
        "instruction": "Open General management.",
        "screen": "settings-list",
        "target": "general"
      },
      {
        "title": "Tap Reset",
        "instruction": "Choose Reset from the General management menu.",
        "screen": "general-management",
        "target": "reset"
      },
      {
        "title": "Tap Reset network settings",
        "instruction": "Choose Reset network settings. This removes saved Wi-Fi, cellular, Bluetooth, and VPN settings.",
        "screen": "reset-options",
        "target": "network"
      },
      {
        "title": "Tap Reset settings",
        "instruction": "Review the message, then tap Reset settings.",
        "screen": "reset-network",
        "target": "button"
      },
      {
        "title": "Confirm Reset",
        "instruction": "Confirm the reset if prompted by your lock screen or security method.",
        "screen": "confirm-reset",
        "target": "confirm"
      },
      {
        "title": "Completed",
        "instruction": "Your network settings are reset. Reconnect to Wi-Fi and Bluetooth devices as needed.",
        "screen": "complete",
        "target": "done"
      }
    ]
  },
  {
    "id": "connect-wifi",
    "title": "Connect to Wi-Fi",
    "duration": "3 min",
    "summary": "Join a wireless network from the device settings menu.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open Settings",
        "instruction": "From the Home screen, open Settings.",
        "screen": "home",
        "target": "settings"
      },
      {
        "title": "Tap Connections",
        "instruction": "Tap Connections near the top of the Settings list.",
        "screen": "settings-list",
        "target": "connections"
      },
      {
        "title": "Tap Wi-Fi",
        "instruction": "Open Wi-Fi and turn it on if needed.",
        "screen": "connections",
        "target": "wifi"
      },
      {
        "title": "Choose a network",
        "instruction": "Tap the network name you want to join.",
        "screen": "wifi-list",
        "target": "network"
      },
      {
        "title": "Connect",
        "instruction": "Enter the password and tap Connect.",
        "screen": "wifi-password",
        "target": "connect"
      }
    ]
  },
  {
    "id": "enable-hotspot",
    "title": "Set Up Mobile Hotspot",
    "duration": "4 min",
    "summary": "Share your mobile data connection with another device.",
    "type": "Step-by-step",
    "steps": [
      {
        "title": "Open Settings",
        "instruction": "Open Settings from the Home screen.",
        "screen": "home",
        "target": "settings"
      },
      {
        "title": "Tap Connections",
        "instruction": "Tap Connections.",
        "screen": "settings-list",
        "target": "connections"
      },
      {
        "title": "Open hotspot settings",
        "instruction": "Tap Mobile Hotspot and Tethering.",
        "screen": "connections",
        "target": "hotspot"
      },
      {
        "title": "Turn on Mobile Hotspot",
        "instruction": "Switch Mobile Hotspot on and review the network name and password.",
        "screen": "hotspot",
        "target": "toggle"
      }
    ]
  }
];
