import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as settingsApi from "../api/settingsApi.js";

const SettingsContext = createContext();

/**
 * Site-wide config (branding, hero content, theme colors, contact/social info)
 * fetched once and applied globally — this is what lets admin edits appear
 * on the live site instantly without a code deploy.
 */
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await settingsApi.getSettings();
    setSettings(res.data.settings);
    return res.data.settings;
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  // Push theme colors into CSS variables whenever settings change.
  useEffect(() => {
    if (!settings?.theme) return;
    const root = document.documentElement.style;
    root.setProperty("--color-primary", settings.theme.primary);
    root.setProperty("--color-secondary", settings.theme.secondary);
    root.setProperty("--color-accent", settings.theme.accent);
    root.setProperty("--color-background", settings.theme.background);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
