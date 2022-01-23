import { createContext, useContext } from 'react';
import { IImageData, IContextState } from '../typings';

const AppContext = createContext<IContextState>({ imageData: []} as IContextState);

export function AppWrapper({ imageData, children } : {imageData: IImageData[]; children: JSX.Element | JSX.Element[]}) {
  const sharedState = {imageData: imageData}

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}