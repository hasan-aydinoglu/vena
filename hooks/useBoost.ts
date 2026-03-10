import { useEffect, useMemo, useState } from "react";

const BOOST_DURATION_MS = 30 * 60 * 1000;

export function useBoost() {
  const [boostEndsAt, setBoostEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isBoostActive = useMemo(() => {
    if (!boostEndsAt) return false;
    return boostEndsAt > now;
  }, [boostEndsAt, now]);

  const remainingMs = useMemo(() => {
    if (!boostEndsAt) return 0;
    return Math.max(boostEndsAt - now, 0);
  }, [boostEndsAt, now]);

  const remainingTime = useMemo(() => {
    const totalSeconds = Math.floor(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [remainingMs]);

  const startBoost = () => {
    setBoostEndsAt(Date.now() + BOOST_DURATION_MS);
  };

  return {
    isBoostActive,
    remainingTime,
    startBoost,
  };
}