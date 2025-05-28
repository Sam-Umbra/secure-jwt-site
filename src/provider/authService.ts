let logoutCallback: (() => void) | null = null;

export function registerLogoutCallback(callback: () => void) {
  logoutCallback = callback;
}

export function triggerLogout() {
  if (logoutCallback) {
    logoutCallback();
  }
}