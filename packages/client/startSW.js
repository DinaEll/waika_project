function startServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/cacheSW.js", { scope: '/' })
        .then(registration => console.log("ServiceWorker registration successful with scope: ", registration.scope))
        .catch((error) => console.log("ServiceWorker registration failed: ", error));
    });
  }
}
startServiceWorker();
