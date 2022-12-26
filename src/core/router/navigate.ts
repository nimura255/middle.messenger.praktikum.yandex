export function navigate(path: string) {
  const href = window.location.origin + path;

  window.history.pushState({}, '', href);

  const popStateEvent = new PopStateEvent('popstate', {});
  dispatchEvent(popStateEvent);
}
