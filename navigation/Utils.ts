import { InitialState, NavigationState } from '@react-navigation/native';

function findFocusedState(state: InitialState) {
  let current: InitialState | undefined = state;
  console.log(state);

  while (current?.routes[current.index ?? 0].state != null) {
    current = current.routes[current.index ?? 0].state;
  }

  return current;
}

export const getStackInfos = (state: NavigationState) => {
  const focusedEndState = findFocusedState(state);
  const focusedRoute = focusedEndState?.routes[focusedEndState?.index ?? 0];
  const currentRouteName = focusedRoute?.name;
  const showBack = (focusedEndState?.type === 'stack' && focusedEndState.routes.length > 1) || false;
  return {
    currentRouteName,
    showBack,
  };
};
