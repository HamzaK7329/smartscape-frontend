import React, { useState } from "react";
import styles from "./NotificationsContent.module.css";

export default function NotificationsContent() {
  // State for toggling categories and notification settings
  const [notifications, setNotifications] = useState({
    system: {
      updates: true,
      reminders: false,
    },
    energy: {
      highUsage: true,
      lowUsage: false,
    },
    security: {
      deviceOffline: true,
    },
  });

  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    inApp: true,
  });

  const [silentMode, setSilentMode] = useState(false);
  const [silentHours, setSilentHours] = useState({ start: "22:00", end: "06:00" });

  // Toggle notifications
  const toggleNotification = (category, key) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  // Toggle preferences
  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle Silent Mode
  const toggleSilentMode = () => setSilentMode((prev) => !prev);

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setSilentHours((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.header}>Notifications</h1>

      {/* Notification Methods */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeader}>Notification Methods</h2>
        <div className={styles.preferences}>
          {Object.entries(preferences).map(([key, value]) => (
            <div className={styles.preferenceItem} key={key}>
              <label>{key.replace(/^\w/, (c) => c.toUpperCase())}</label>
              <button
                className={`${styles.toggleButton} ${
                  value ? styles.active : styles.inactive
                }`}
                onClick={() => togglePreference(key)}
              >
                {value ? "On" : "Off"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Silent Mode */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeader}>Silent Mode</h2>
        <div className={styles.silentMode}>
          <label>
            <input
              type="checkbox"
              checked={silentMode}
              onChange={toggleSilentMode}
            />
            Enable Silent Mode
          </label>
          {silentMode && (
            <div className={styles.silentHours}>
              <div>
                <label>Start:</label>
                <input
                  type="time"
                  name="start"
                  value={silentHours.start}
                  onChange={handleTimeChange}
                />
              </div>
              <div>
                <label>End:</label>
                <input
                  type="time"
                  name="end"
                  value={silentHours.end}
                  onChange={handleTimeChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Categories */}
      {Object.entries(notifications).map(([category, settings]) => (
        <div key={category} className={styles.section}>
          <h2 className={styles.sectionHeader}>
            {category.replace(/^\w/, (c) => c.toUpperCase())}
          </h2>
          <div className={styles.notificationsList}>
            {Object.entries(settings).map(([key, value]) => (
              <div className={styles.notificationItem} key={key}>
                <span className={styles.notificationLabel}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </span>
                <button
                  className={`${styles.toggleButton} ${
                    value ? styles.active : styles.inactive
                  }`}
                  onClick={() => toggleNotification(category, key)}
                >
                  {value ? "On" : "Off"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
