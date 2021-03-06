import React, { useContext, useState, useCallback } from 'react';
import produce from 'immer';

interface StoreType {
  [key: string]: ()=>any;
}

const storeContext = React.createContext<any>({});

export interface StoreParams {
  debug?: boolean;
}

export function createReactionStore<
  T extends StoreType,
  K extends keyof T
>(store: T, params: StoreParams = {}) {
  const { debug = false } = params;
  return {
    Provider({ children }: { children: React.ReactNode }) {
      const mapStore: StoreType = {};

      Object.keys(store).forEach(key => {
        mapStore[key] = store[key]();
      });

      return (
        <storeContext.Provider value={mapStore}>
          {children}
        </storeContext.Provider>
      );
    },
    useImmerState<S>(
      initState: S
    ): [S, (dispatch: (newState: S) => S) => void] {
      const [state, setState] = useState<S>(initState);

      const debuggerLog = useCallback((nextState: S) => {
        // debugger
        return nextState;
      }, []);

      const setEnhanceState = useCallback(
        (setData: (newState: S) => S) => {
          setState(newState => {
            return debug
              ? debuggerLog(produce<S>(newState, setData as any))
              : produce<S>(newState, setData as any);
          });
        },
        [debuggerLog]
      );

      return [state, setEnhanceState];
    },
    useStore() {
      return useContext<T>(storeContext);
    },
    useSelector<P extends K>(selector: P) {
      return useContext(storeContext)[selector] as ReturnType<T[P]>;
    }
  };
}
