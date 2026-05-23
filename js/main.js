const app = document.querySelector("#app");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");

let state = {
  route: "home",
  brandId: null,
  deviceId: null,
  tutorialId: null,
  stepIndex: 0,
  query: ""
};

// Small data helpers keep rendering functions readable and avoid repeated loops.
const byId = (items, id) => items.find((item) => item.id === id);
const getBrand = (brandId) => byId(appData.brands, brandId);
const getDevices = (brandId) => appData.devices[brandId] || [];
const getDevice = (deviceId) => Object.entries(appData.devices)
  .flatMap(([brandId, devices]) => devices.map((device) => ({ ...device, brandId })))
  .find((device) => device.id === deviceId);
function getTutorials(deviceId) {
  if (appData.tutorials[deviceId]) return appData.tutorials[deviceId];

  const device = getDevice(deviceId);
  if (device?.brandId === "apple") return appData.tutorials["iphone-15"];
  if (device?.brandId === "samsung") return appData.tutorials["samsung-s24"];

  return appData.tutorials.default;
}
const getInitials = (name) => name.split(/[\s/-]+/).map((part) => part[0]).join("").slice(0, 3).toUpperCase();

function navigate(route, updates = {}) {
  state = { ...state, route, stepIndex: 0, ...updates };
  render();
  app.focus();
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function render() {
  const routes = {
    home: renderHome,
    brands: renderBrands,
    devices: renderDevices,
    simulator: renderSimulator,
    "coming-soon": renderComingSoon
  };

  const view = routes[state.route] || renderHome;
  app.innerHTML = view();
  attachViewEvents();
}

function heroSearchMarkup() {
  return `
    <form class="search-panel" id="searchForm">
      <label for="searchInput">Find a device or tutorial</label>
      <div class="search-row">
        <input id="searchInput" type="search" value="${state.query}" placeholder="Search iPhone, Galaxy, hotspot, Wi-Fi...">
        <button type="submit">Search</button>
      </div>
    </form>
  `;
}

function renderHome() {
  const supportedBrands = appData.brands.filter((brand) => brand.supported);
  const popularDevices = Object.entries(appData.devices)
    .flatMap(([brandId, devices]) => devices.map((device) => ({ ...device, brandId, brand: getBrand(brandId).name })))
    .filter((device) => device.popular)
    .slice(0, 8);

  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Interactive mobile help</p>
          <h1>Choose a phone and walk through guided setup steps.</h1>
          <p>Explore original device tutorials for common tasks like Wi-Fi, hotspot, SIM setup, screenshots, updates, resets, and basic troubleshooting.</p>
          ${heroSearchMarkup()}
        </div>
        <div class="hero-phone" aria-hidden="true">
          ${phoneMockup({ name: "Device Guide", brandId: "samsung" }, { title: "Preview", screen: "home", target: "settings" })}
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Browse</p>
          <h2>Supported brands</h2>
        </div>
        <button class="link-button" data-route="brands">View all</button>
      </div>
      <div class="card-grid brand-grid">
        ${supportedBrands.slice(0, 8).map(brandCard).join("")}
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Fast access</p>
          <h2>Popular devices</h2>
        </div>
      </div>
      <div class="card-grid device-grid">
        ${popularDevices.map(deviceCard).join("")}
      </div>
    </section>
  `;
}

function renderBrands() {
  return `
    <section class="page-title container">
      <p class="eyebrow">Brand directory</p>
      <h1>Select a mobile brand</h1>
      <p>Supported brands open a model list. Unsupported brands show a clean coming soon state.</p>
    </section>
    <section class="section container">
      <div class="card-grid brand-grid">
        ${appData.brands.map(brandCard).join("")}
      </div>
    </section>
  `;
}

function renderDevices() {
  const brand = getBrand(state.brandId);
  if (!brand || !brand.supported) return renderComingSoon();

  const devices = getDevices(brand.id);
  return `
    <section class="page-title container">
      <button class="back-button" data-route="brands">Back to brands</button>
      <p class="eyebrow">${brand.name}</p>
      <h1>Choose a device model</h1>
      <p>${devices.length} commonly used ${brand.name} models are listed. More models can be added anytime in <code>js/data.js</code>.</p>
    </section>
    <section class="section container">
      <div class="filter-bar device-filter-bar">
        <input id="deviceFilter" type="search" placeholder="Filter ${brand.name} models..." value="${state.query}">
        <span>${devices.length} models</span>
      </div>
      <div class="card-grid device-grid" id="deviceResults">
        ${devices.map((device) => deviceCard({ ...device, brandId: brand.id, brand: brand.name })).join("")}
      </div>
    </section>
  `;
}

function renderSimulator() {
  const device = getDevice(state.deviceId);
  if (!device) return renderComingSoon();

  const brand = getBrand(device.brandId);
  const skin = getSkin(device.brandId);
  const tutorials = getTutorials(device.id);
  const selectedTutorial = byId(tutorials, state.tutorialId) || tutorials[0];
  const step = selectedTutorial.steps[state.stepIndex];
  const total = selectedTutorial.steps.length;

  return `
    <section class="simulator-shell container">
      <div class="breadcrumbs">
        <button data-route="home">Home</button>
        <span>/</span>
        <button data-brand="${device.brandId}" data-action="device-list">${brand.name}</button>
        <span>/</span>
        <strong>${device.name}</strong>
      </div>

      <div class="guide-hero">
        <div>
          <p class="eyebrow">${skin.name} simulator</p>
          <h1>${device.name}</h1>
          <p>${skin.os} style guides for common setup, connection, reset, and troubleshooting tasks.</p>
        </div>
        <div class="guide-hero-phone" aria-hidden="true">
          ${phoneMockup(device, { title: "Home", screen: skin.os === "iOS" ? "ios-home" : "home", target: "settings" })}
        </div>
      </div>

      <section class="topic-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Trending support</p>
            <h2>${device.name} help topics</h2>
          </div>
        </div>
        <div class="topic-grid">
          ${tutorials.map((tutorial, index) => topicCard(tutorial, selectedTutorial.id, index)).join("")}
        </div>
      </section>

      <div class="active-guide">
        <div class="guide-copy">
          <p class="eyebrow">${device.name}</p>
          <h2>${selectedTutorial.title}</h2>
          <p>${selectedTutorial.summary || "Follow the steps below to complete this task on your selected device."}</p>
        </div>

        <section class="step-panel guide-steps" aria-live="polite">
          <div class="guide-note">If the menu names are slightly different on your model, use search inside Settings and follow the closest matching option.</div>
          <div class="step-meta">
            <span>Step ${state.stepIndex + 1} of ${total}</span>
            <span>${selectedTutorial.duration}</span>
          </div>
          <div class="progress-track">
            <span style="width: ${((state.stepIndex + 1) / total) * 100}%"></span>
          </div>
          <h2>${step.title}</h2>
          <p>${step.instruction}</p>
          <ol class="step-list">
            ${selectedTutorial.steps.map((item, index) => `
              <li class="${index === state.stepIndex ? "is-current" : ""}">
                <button data-step="${index}">
                  <span>${index + 1}</span>
                  ${item.title}
                </button>
              </li>
            `).join("")}
          </ol>
          <div class="step-actions">
            <button data-action="prev-step" ${state.stepIndex === 0 ? "disabled" : ""}>Previous</button>
            <button data-action="next-step" ${state.stepIndex === total - 1 ? "disabled" : ""}>Next</button>
          </div>
        </section>

        <section class="phone-stage guide-phone-stage" aria-label="Phone preview">
          ${phoneMockup(device, step)}
          <button class="zoom-button" aria-label="Preview zoom">+</button>
        </section>
      </div>
    </section>
  `;
}

function renderComingSoon() {
  return `
    <section class="empty-state container">
      <div class="empty-visual" aria-hidden="true">
        ${phoneMockup({ name: "Coming Soon", brandId: "samsung" }, { title: "Preview", screen: "complete", target: "done" })}
      </div>
      <div>
        <p class="eyebrow">More guides on the way</p>
        <h1>This device simulator is coming soon.</h1>
        <p>We are preparing more phone models and tutorials. For now, choose a supported brand from the directory.</p>
        <button class="primary-button" data-route="brands">Browse supported brands</button>
      </div>
    </section>
  `;
}

function topicCard(tutorial, selectedId, index) {
  return `
    <button class="topic-card ${tutorial.id === selectedId ? "is-active" : ""}" data-tutorial="${tutorial.id}">
      <span class="topic-pill">${tutorial.type || "Step-by-step"}</span>
      <strong>${tutorial.title}</strong>
      <small>${tutorial.summary || "Guided task for this device."}</small>
      <span class="topic-meta">${tutorial.duration} - ${index === 0 ? "Popular" : "Guide"}</span>
    </button>
  `;
}

function brandCard(brand) {
  const status = brand.supported ? "Supported" : "Coming soon";
  return `
    <button class="brand-card" data-brand="${brand.id}" style="--accent:${brand.accent}">
      <span class="card-icon">${getInitials(brand.name)}</span>
      <strong>${brand.name}</strong>
      <small>${status}</small>
    </button>
  `;
}

function deviceCard(device) {
  return `
    <button class="device-card" data-brand="${device.brandId}" data-device="${device.id}">
      <span class="device-thumb">${phoneMini()}</span>
      <span>
        <strong>${device.name}</strong>
        <small>${device.brand} - ${device.series}</small>
      </span>
    </button>
  `;
}

function phoneMini() {
  return `<span class="mini-phone"><span></span></span>`;
}

function attachViewEvents() {
  // Rebind events after each render because the app uses dynamic HTML.
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });

  document.querySelectorAll("[data-brand]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "device-list") {
        navigate("devices", { brandId: button.dataset.brand, query: "" });
        return;
      }

      const brand = getBrand(button.dataset.brand);
      navigate(brand?.supported ? "devices" : "coming-soon", { brandId: button.dataset.brand, query: "" });
    });
  });

  document.querySelectorAll("[data-device]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate("simulator", {
        brandId: button.dataset.brand,
        deviceId: button.dataset.device,
        tutorialId: getTutorials(button.dataset.device)[0].id
      });
    });
  });

  document.querySelectorAll("[data-tutorial]").forEach((button) => {
    button.addEventListener("click", () => navigate("simulator", { tutorialId: button.dataset.tutorial, stepIndex: 0 }));
  });

  document.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      state.stepIndex = Number(button.dataset.step);
      render();
    });
  });

  document.querySelectorAll("[data-action='prev-step']").forEach((button) => {
    button.addEventListener("click", () => {
      state.stepIndex = Math.max(0, state.stepIndex - 1);
      render();
    });
  });

  document.querySelectorAll("[data-action='next-step']").forEach((button) => {
    button.addEventListener("click", () => {
      const tutorials = getTutorials(state.deviceId);
      const tutorial = byId(tutorials, state.tutorialId) || tutorials[0];
      state.stepIndex = Math.min(tutorial.steps.length - 1, state.stepIndex + 1);
      render();
    });
  });

  const searchForm = document.querySelector("#searchForm");
  if (searchForm) searchForm.addEventListener("submit", handleSearch);

  const deviceFilter = document.querySelector("#deviceFilter");
  if (deviceFilter) deviceFilter.addEventListener("input", handleDeviceFilter);
}

function handleSearch(event) {
  event.preventDefault();
  const query = document.querySelector("#searchInput").value.trim().toLowerCase();
  state.query = query;

  const matchingBrand = appData.brands.find((brand) => brand.name.toLowerCase().includes(query));
  if (matchingBrand) {
    navigate(matchingBrand.supported ? "devices" : "coming-soon", { brandId: matchingBrand.id, query: "" });
    return;
  }

  const matchingDevice = Object.entries(appData.devices).flatMap(([brandId, devices]) =>
    devices.map((device) => ({ ...device, brandId }))
  ).find((device) => device.name.toLowerCase().includes(query) || device.series.toLowerCase().includes(query));

  if (matchingDevice) {
    navigate("simulator", {
      brandId: matchingDevice.brandId,
      deviceId: matchingDevice.id,
      tutorialId: getTutorials(matchingDevice.id)[0].id
    });
    return;
  }

  const matchingTutorial = appData.tutorials.default.find((tutorial) => tutorial.title.toLowerCase().includes(query));
  if (matchingTutorial) {
    navigate("simulator", {
      brandId: "samsung",
      deviceId: "samsung-s24",
      tutorialId: matchingTutorial.id
    });
    return;
  }

  app.innerHTML = `
    <section class="empty-state container">
      <div>
        <p class="eyebrow">No results</p>
        <h1>No matching device or tutorial found.</h1>
        <p>Try searching for a brand, phone model, Wi-Fi, hotspot, screenshot, data, reset, or update.</p>
        <button class="primary-button" data-route="home">Search again</button>
      </div>
    </section>
  `;
  attachViewEvents();
}

function handleDeviceFilter(event) {
  const query = event.target.value.toLowerCase();
  const brand = getBrand(state.brandId);
  const filtered = getDevices(state.brandId).filter((device) =>
    `${device.name} ${device.series}`.toLowerCase().includes(query)
  );
  const results = document.querySelector("#deviceResults");
  const count = document.querySelector(".device-filter-bar span");
  if (count) count.textContent = `${filtered.length} models`;

  results.innerHTML = filtered.length
    ? filtered.map((device) => deviceCard({ ...device, brandId: brand.id, brand: brand.name })).join("")
    : `<div class="inline-empty">No models match that search.</div>`;

  document.querySelectorAll("[data-device]").forEach((button) => {
    button.addEventListener("click", () => navigate("simulator", {
      brandId: button.dataset.brand,
      deviceId: button.dataset.device,
      tutorialId: getTutorials(button.dataset.device)[0].id
    }));
  });
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

function loadRouteFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const brandId = params.get("brand");
  const deviceId = params.get("device");

  if (deviceId && getDevice(deviceId)) {
    state = {
      ...state,
      route: "simulator",
      brandId: getDevice(deviceId).brandId,
      deviceId,
      tutorialId: getTutorials(deviceId)[0].id
    };
    return;
  }

  if (brandId) {
    const brand = getBrand(brandId);
    state = {
      ...state,
      route: brand?.supported ? "devices" : "coming-soon",
      brandId
    };
  }
}

loadRouteFromUrl();
render();
