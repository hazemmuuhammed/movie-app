"use client";
import { useEffect } from "react";
import { useFavoritesStore } from "../../store/useStore";
import styles from "@/styles/Notification.module.css";

export function Notification() {
  const { notification, setNotification } = useFavoritesStore();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  if (!notification) return null;

  return <div className={styles.notification}>{notification}</div>;
}
