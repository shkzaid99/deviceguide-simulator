// Renders phone frames and OS-like screens for simulator steps.
const uiSkins = {
  samsung: { name: "One UI", className: "skin-oneui", os: "Android" },
  apple: { name: "iOS", className: "skin-ios", os: "iOS" },
  xiaomi: { name: "HyperOS", className: "skin-miui", os: "Android" },
  redmi: { name: "HyperOS", className: "skin-miui", os: "Android" },
  poco: { name: "HyperOS", className: "skin-miui", os: "Android" },
  oppo: { name: "ColorOS", className: "skin-coloros", os: "Android" },
  realme: { name: "realme UI", className: "skin-realme", os: "Android" },
  vivo: { name: "Funtouch OS", className: "skin-funtouch", os: "Android" },
  iqoo: { name: "Funtouch OS", className: "skin-iqoo", os: "Android" },
  oneplus: { name: "OxygenOS", className: "skin-oxygen", os: "Android" },
  motorola: { name: "Moto Android", className: "skin-stock", os: "Android" }
};

const getSkin = (brandId) => uiSkins[brandId] || uiSkins.samsung;

function getDeviceProfile(device) {
  const id = (device.id || "").toLowerCase();
  const name = (device.name || "").toLowerCase();
  const series = (device.series || "").toLowerCase();
  const text = `${id} ${name} ${series}`;

  if (device.brandId === "apple") {
    if (text.includes("se")) {
      return { frame: "frame-iphone-home", camera: "camera-none", shape: "shape-home-button", label: "iPhone SE body" };
    }

    if (text.includes("17") || text.includes("16") || text.includes("15") || text.includes("14-pro")) {
      return { frame: "frame-iphone-modern", camera: "camera-dynamic", shape: "shape-rounded", label: "Dynamic Island iPhone" };
    }

    return { frame: "frame-iphone-notch", camera: "camera-notch", shape: "shape-rounded", label: "Notch iPhone" };
  }

  if (text.includes("pad") || text.includes("tablet")) {
    return { frame: "frame-tablet", camera: "camera-small-dot", shape: "shape-tablet", label: "Tablet layout" };
  }

  if (device.brandId === "samsung") {
    if (text.includes("fold")) {
      return { frame: "frame-fold", camera: "camera-small-dot", shape: "shape-fold", label: "Galaxy Fold style" };
    }

    if (text.includes("flip")) {
      return { frame: "frame-flip", camera: "camera-center-punch", shape: "shape-rounded", label: "Galaxy Flip style" };
    }

    if (text.includes("ultra") || text.includes("note")) {
      return { frame: "frame-squared", camera: "camera-center-punch", shape: "shape-square", label: "Galaxy Ultra/Note style" };
    }

    return { frame: "frame-galaxy", camera: "camera-center-punch", shape: "shape-rounded", label: "Galaxy style" };
  }

  if (device.brandId === "motorola") {
    return { frame: "frame-stock-android", camera: "camera-center-punch", shape: "shape-rounded", label: "Moto Android style" };
  }

  if (["xiaomi", "redmi", "poco"].includes(device.brandId)) {
    return { frame: "frame-hyperos", camera: "camera-center-punch", shape: "shape-rounded", label: "HyperOS phone style" };
  }

  if (["oppo", "realme", "vivo", "iqoo", "oneplus"].includes(device.brandId)) {
    return { frame: "frame-curved-android", camera: "camera-center-punch", shape: "shape-curved", label: `${getSkin(device.brandId).name} phone style` };
  }

  return { frame: "frame-generic", camera: "camera-center-punch", shape: "shape-rounded", label: "Phone style" };
}

function phoneMockup(device, step) {
  const skin = getSkin(device.brandId);
  const profile = getDeviceProfile(device);
  const screen = step.screen || "home";
  const target = step.target || "";

  return `
    <div class="phone-mockup ${skin.className} ${profile.frame} ${profile.shape}">
      <div class="device-badge">${device.name}<span>${profile.label}</span></div>
      <div class="phone-camera ${profile.camera}"></div>
      <div class="phone-speaker"></div>
      <div class="phone-screen">
        ${renderPhoneScreen(skin, screen, target)}
      </div>
      <div class="home-button"></div>
    </div>
  `;
}

function renderPhoneScreen(skin, screen, target) {
  const isIos = skin.name === "iOS";
  if (isIos) return renderIosScreen(screen, target);
  return renderAndroidScreen(skin, screen, target);
}

function statusBar(label = "5G") {
  return `<div class="status-row"><span>9:41</span><span>${label} 100%</span></div>`;
}

function targetRing(activeTarget, currentTarget) {
  return activeTarget === currentTarget ? `<span class="tap-ring" aria-hidden="true"></span>` : "";
}

function androidHome(target) {
  return `
    ${statusBar()}
    <div class="android-weather"><strong>24 deg</strong><span>Partly cloudy</span></div>
    <div class="android-search">Search your phone</div>
    <div class="android-icons">
      ${["Phone", "Messages", "Browser", "Camera", "Settings", "Gallery"].map((label) => `
        <div class="android-app ${target === "settings" && label === "Settings" ? "is-target" : ""}">
          ${target === "settings" && label === "Settings" ? targetRing("settings", target) : ""}
          <span></span><small>${label}</small>
        </div>
      `).join("")}
    </div>
    <div class="android-nav"><span></span><span></span><span></span></div>
  `;
}

function androidQuickSettings(target, isOn = false) {
  const toggles = [
    ["Wi-Fi", "wifi"],
    ["Sound", "sound"],
    ["Bluetooth", "bluetooth"],
    ["Mobile data", "data"],
    ["Airplane", "airplane"],
    ["Flashlight", "flash"]
  ];

  return `
    ${statusBar()}
    <div class="quick-panel">
      <div class="quick-top">
        <span>Today</span>
        <button class="${target === "gear" ? "is-target" : ""}">${targetRing("gear", target)}Settings</button>
      </div>
      <div class="quick-grid">
        ${toggles.map(([label, id]) => `
          <div class="quick-toggle ${(id === "wifi" || id === "sound" || (id === "data" && isOn)) ? "is-on" : ""} ${target === id ? "is-target" : ""}">
            ${targetRing(id, target)}
            <span></span><small>${label}</small>
          </div>
        `).join("")}
      </div>
      <div class="brightness"></div>
    </div>
  `;
}

function androidSettingsList(target) {
  const rows = [
    ["Connections", "Wi-Fi, Bluetooth, data usage", "connections"],
    ["Sounds and vibration", "Sound mode, ringtone", "sounds"],
    ["Notifications", "Alerts and permissions", "notifications"],
    ["Display", "Brightness, home screen", "display"],
    ["Lock screen", "Always On Display", "lock"],
    ["General management", "Language, keyboard, reset", "general"],
    ["Software update", "Download and install", "check"]
  ];
  return `${statusBar()}${phoneList("Settings", rows, target)}`;
}

function androidConnections(target) {
  return `${statusBar()}${phoneList("Connections", [
    ["Wi-Fi", "Connected networks", "wifi"],
    ["Bluetooth", "Pair devices", "bluetooth"],
    ["Mobile networks", "Data roaming, network mode", "data"],
    ["Mobile Hotspot and Tethering", "Share your connection", "hotspot"]
  ], target)}`;
}

function phoneList(title, rows, target) {
  return `
    <div class="phone-list">
      <h3>${title}</h3>
      ${rows.map(([name, meta, id]) => `
        <div class="phone-row ${target === id ? "is-target" : ""}">
          ${targetRing(id, target)}
          <span class="row-dot"></span>
          <div><strong>${name}</strong><small>${meta}</small></div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderAndroidScreen(skin, screen, target) {
  const screens = {
    home: () => androidHome(target),
    "quick-settings": () => androidQuickSettings(target),
    "quick-settings-on": () => androidQuickSettings(target, true),
    "settings-list": () => androidSettingsList(target),
    connections: () => androidConnections(target),
    "wifi-list": () => `${statusBar()}${phoneList("Wi-Fi", [["Home Network", "Secured", "network"], ["Office Wi-Fi", "Secured", "office"], ["Guest", "Open", "guest"]], target)}`,
    "wifi-password": () => `${statusBar()}<div class="dialog-card ${target === "connect" ? "is-target" : ""}">${targetRing("connect", target)}<h3>Home Network</h3><p>Enter network password</p><div class="input-line"></div><button>Connect</button></div>`,
    "general-management": () => `${statusBar()}${phoneList("General management", [["Language", "English", "language"], ["Keyboard list", "Default keyboard", "keyboard"], ["Date and time", "Automatic", "time"], ["Reset", "Reset all settings", "reset"]], target)}`,
    "reset-options": () => `${statusBar()}${phoneList("Reset", [["Reset all settings", "Return settings to defaults", "all"], ["Reset network settings", "Wi-Fi, Bluetooth, cellular", "network"], ["Factory data reset", "Erase phone", "factory"]], target)}`,
    "reset-network": () => `${statusBar()}<div class="confirm-card ${target === "button" ? "is-target" : ""}">${targetRing("button", target)}<h3>Reset network settings?</h3><p>This will reset Wi-Fi, mobile data, Bluetooth, and VPN settings.</p><button>Reset settings</button></div>`,
    "confirm-reset": () => `${statusBar()}<div class="confirm-card ${target === "confirm" ? "is-target" : ""}">${targetRing("confirm", target)}<h3>Confirm reset</h3><p>Use your screen lock to continue.</p><button>Reset</button></div>`,
    hotspot: () => `${statusBar()}<div class="phone-list"><h3>Mobile Hotspot</h3><div class="switch-row ${target === "toggle" ? "is-target" : ""}">${targetRing("toggle", target)}<div><strong>Mobile Hotspot</strong><small>DeviceGuide S24</small></div><span class="switch"></span></div><div class="password-box">Password: guide1234</div></div>`,
    "software-update": () => `${statusBar()}<div class="confirm-card ${target === "check" ? "is-target" : ""}">${targetRing("check", target)}<h3>Software update</h3><p>Last checked today.</p><button>Download and install</button></div>`,
    "install-update": () => `${statusBar()}<div class="confirm-card ${target === "install" ? "is-target" : ""}">${targetRing("install", target)}<h3>Update ready</h3><p>Keep your phone charged.</p><button>Install now</button></div>`,
    power: () => `${statusBar()}<div class="power-screen ${target === "restart" || target === "power" ? "is-target" : ""}">${targetRing(target, target)}<button>Power off</button><button>Restart</button></div>`,
    "sim-tray": () => `${statusBar()}<div class="sim-screen ${target === "tray" ? "is-target" : ""}">${targetRing("tray", target)}<span></span><strong>SIM tray</strong><p>Insert the pin into the tray hole.</p></div>`,
    "sim-ready": () => `${statusBar()}<div class="complete-screen"><strong>SIM detected</strong><p>Your mobile network is ready.</p></div>`,
    screenshot: () => `${androidHome(target)}<div class="screenshot-flash"></div>`,
    gallery: () => `${statusBar()}<div class="gallery-grid"><span></span><span></span><span></span><span></span></div>`,
    backup: () => `${statusBar()}<div class="confirm-card ${target === "backup" ? "is-target" : ""}">${targetRing("backup", target)}<h3>Back up data</h3><p>Save contacts, photos, and files before reset.</p><button>Back up now</button></div>`,
    "factory-reset": () => `${statusBar()}<div class="confirm-card ${target === "erase" ? "is-target" : ""}">${targetRing("erase", target)}<h3>Erase all data?</h3><p>This cannot be undone.</p><button>Factory reset</button></div>`,
    "app-store": () => `${statusBar()}${phoneList("App updates", [["Update all", "5 updates available", "updates"], ["Phone Manager", "Ready", "manager"]], target)}`,
    complete: () => `${statusBar()}<div class="complete-screen"><strong>Complete</strong><p>This guide is finished.</p></div>`
  };
  return (screens[screen] || screens.home)();
}

function iosHome(target) {
  return `
    ${statusBar("5G")}
    <div class="ios-home-grid">
      ${["FaceTime", "Calendar", "Photos", "Camera", "Mail", "Clock", "Maps", "Settings"].map((label) => `
        <div class="ios-app ${target === "settings" && label === "Settings" ? "is-target" : ""}">
          ${target === "settings" && label === "Settings" ? targetRing("settings", target) : ""}
          <span></span><small>${label}</small>
        </div>
      `).join("")}
    </div>
    <div class="ios-dock"><span></span><span></span><span></span><span></span></div>
  `;
}

function iosSettings(target) {
  return `${statusBar("5G")}<div class="ios-list"><h3>Settings</h3>${[
    ["Apple Account", "Name, iCloud, Media", "account"],
    ["Wi-Fi", "Home Network", "wifi"],
    ["Bluetooth", "On", "bluetooth"],
    ["Cellular", "Mobile data", "data"],
    ["Personal Hotspot", "Off", "hotspot"],
    ["General", "About, software update", "general"]
  ].map(([name, meta, id]) => iosRow(name, meta, id, target)).join("")}</div>`;
}

function iosRow(name, meta, id, target) {
  return `<div class="ios-row ${target === id ? "is-target" : ""}">${targetRing(id, target)}<div><strong>${name}</strong><small>${meta}</small></div><span>></span></div>`;
}

function renderIosScreen(screen, target) {
  const screens = {
    "ios-home": () => iosHome(target),
    "ios-settings": () => iosSettings(target),
    "ios-general": () => `${statusBar("5G")}<div class="ios-list"><h3>General</h3>${[
      ["About", "Device details", "about"],
      ["Software Update", "iOS is up to date", "update"],
      ["AirDrop", "Contacts only", "airdrop"],
      ["Transfer or Reset iPhone", "Prepare or erase", "transfer"]
    ].map(([name, meta, id]) => iosRow(name, meta, id, target)).join("")}</div>`,
    "ios-transfer": () => `${statusBar("5G")}<div class="ios-list"><h3>Transfer or Reset iPhone</h3><div class="ios-action ${target === "reset" ? "is-target" : ""}">${targetRing("reset", target)}Reset</div><div class="ios-danger">Erase All Content and Settings</div></div>`,
    "ios-reset-sheet": () => `${iosHome("")}<div class="ios-sheet ${target === "network" ? "is-target" : ""}">${targetRing("network", target)}<button>Reset All Settings</button><button>Reset Network Settings</button><button>Reset Keyboard Dictionary</button></div>`,
    "ios-confirm": () => `${statusBar("5G")}<div class="ios-confirm ${target === "confirm" ? "is-target" : ""}">${targetRing("confirm", target)}<h3>Reset Network Settings?</h3><p>This will delete network settings and restart iPhone.</p><button>Reset Network Settings</button></div>`,
    "ios-hotspot": () => `${statusBar("5G")}<div class="ios-list"><h3>Personal Hotspot</h3><div class="switch-row ${target === "toggle" ? "is-target" : ""}">${targetRing("toggle", target)}<div><strong>Allow Others to Join</strong><small>Off</small></div><span class="switch"></span></div><div class="password-box ${target === "password" ? "is-target" : ""}">${targetRing("password", target)}Wi-Fi Password: guide1234</div></div>`
  };
  return (screens[screen] || screens["ios-home"])();
}
