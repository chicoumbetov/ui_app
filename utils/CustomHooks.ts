/**
 * Liste des CustomHook
 *
 * @author: David Buch
 */
import {
  ComponentProps,
  DependencyList, EffectCallback, ForwardedRef, useCallback, useEffect, useRef, useState,
} from 'react';
import { useDimensions } from '@react-native-community/hooks';
import {
  Animated, Platform, ScaledSize, View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Auth } from 'aws-amplify';

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useHasChanged = <T extends unknown>(value: T): boolean => {
  const prevVal = usePrevious<T>(value);
  return prevVal !== value;
};

export const useUpdateEffect = (effect: EffectCallback, dependencies: DependencyList = []): void => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
};

export const useIsTablet = (breakpoint = 1000) => {
  const { window } = useDimensions();
  return window.width > breakpoint;
};

export const useIsIphoneX = () => {
  const { window } = useDimensions();

  const iPhoneXHeight = 812;
  const iPhoneXrHeight = 896;

  const checkMaxSize = (dim: ScaledSize, size: number) => {
    const toCheck = dim.height > dim.width ? dim.height : dim.width;
    return toCheck == size;
  };

  return (
    Platform.OS === 'ios' && (checkMaxSize(window, iPhoneXHeight) || checkMaxSize(window, iPhoneXrHeight))
  );
};

export const useNetworkInfo = () => {
  const [network, setNetwork] = useState<boolean | undefined | null>();

  useEffect(() => NetInfo.addEventListener((state) => {
    setNetwork(state.isInternetReachable);
  }), []);

  return network;
};

export const useForwardedRef = <T>(ref: ForwardedRef<T>) => {
  const innerRef = useRef<T>(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
};

export function useAuth() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (active) setUser(currentUser);
      } catch (error) {
        if (active) setUser(null);
      }
    };

    check();

    return () => { active = false; };
  }, [setUser]);

  const signOut = useCallback(async () => {
    await Auth.signOut();
    setUser(null);
  }, [setUser]);

  return {
    user, signOut,
  };
}

export function useLayout() {
  const [layout, setLayout] = useState({
    height: 0,
  });
  const onLayout: ComponentProps<typeof View>['onLayout'] = ({
    nativeEvent,
  }) => {
    setLayout(nativeEvent.layout);
  };

  return [layout, onLayout] as const;
}
