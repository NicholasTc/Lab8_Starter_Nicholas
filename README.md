# Lab8-Starter

Github Page URL:
https://nicholastc.github.io/Lab8_Starter_Nicholas/

Short paragraph about graceful degradation and service workers:
Graceful degradation and service workers are closely connected because service workers give a web app a built‑in fallback when higher‑tier resources (the live network) fail. With graceful degradation, we first build the full‑feature experience that depends on modern capabilities (fast internet, fresh server data), but we also provide a “lower tier” that still functions if those capabilities disappear. A service worker implements that lower tier: it intercepts each request and, when the network is slow or offline, serves the cached HTML, CSS, JavaScript, images, and JSON stored locally. Users might lose the freshness of live data, yet the core recipe cards still render and the UI remains usable—exactly the kind of resilient, user‑friendly behavior graceful degradation aims for.

pwa.png:
![installed PWA screenshot](/assets/images/pwa.png)