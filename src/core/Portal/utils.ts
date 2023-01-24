import { portalContainerId } from './constants';

export function renderToPortal(element: HTMLElement) {
  const container = document.getElementById(portalContainerId);

  if (!container) {
    return;
  }

  if (!container.contains(element)) {
    container.appendChild(element);
  }
}

export function removeFromPortal(element: HTMLElement) {
  const container = document.getElementById(portalContainerId);

  if (!container) {
    return;
  }

  if (container.contains(element)) {
    container.removeChild(element);
  }
}
