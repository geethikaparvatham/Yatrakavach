import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeJourney, setActiveJourney] = useState(null);
  const [isSosActive, setIsSosActive] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Welcome to YatraKavach', message: 'Stay safe on your journey.', time: 'Just now', read: false }
  ]);

  const startJourney = (journeyDetails) => {
    setActiveJourney({
      ...journeyDetails,
      status: 'In Progress',
      startTime: new Date().toISOString(),
      distanceCovered: '0 km',
      safetyStatus: 'Safe'
    });
  };

  const endJourney = () => {
    setActiveJourney(null);
  };

  const activateSos = () => {
    setIsSosActive(true);
  };

  const deactivateSos = () => {
    setIsSosActive(false);
  };

  const addNotification = (notif) => {
    setNotifications(prev => [notif, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      activeJourney, startJourney, endJourney,
      isSosActive, activateSos, deactivateSos,
      notifications, addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
