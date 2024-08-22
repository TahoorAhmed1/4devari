import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadScript } from '../utils/google';

const GoogleMapsContext = createContext();

export const GoogleApiProvider = ({ children }) => {
  const [isApiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    // Load the Google Maps API script when the context provider mounts
    loadScript().then(() => {
      console.log('Google Maps API is loaded!');
      setApiLoaded(true);
    });
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ isApiLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleApi = () => {
  return useContext(GoogleMapsContext);
};
