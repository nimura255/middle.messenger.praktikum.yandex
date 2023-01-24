import { navigate } from '$core/router';
import { store } from '$store';
import { authOnlyRoutes, nonAuthOnlyRoutes } from './constants';

export function handleRoutesRestrictions() {
  const storeState = store.getState();
  const { user } = storeState;

  const currentPathname = window.location.pathname;
  const isAuthOnlyPathname = authOnlyRoutes.includes(currentPathname);
  const isNonAuthOnlyPathname =
    nonAuthOnlyRoutes.includes(currentPathname);

  if (!user && isAuthOnlyPathname) {
    navigate(nonAuthOnlyRoutes[0]);
  } else if (user && isNonAuthOnlyPathname) {
    navigate(authOnlyRoutes[0]);
  }
}
