import { useEffect, useState } from "react";

const useDebounce = () => {
  const [timeOutId, setTimeOutId] = useState<number | null>(null);

  const debounce = (func: () => void, delay: number) => {
    // Tehn call the func aftetr the timeout hass pased
    const timeOutId = setTimeout(() => {
      func();
    }, delay);

    setTimeOutId(timeOutId);
  };

  useEffect(() => {
    if (!timeOutId) return;
    return () => clearTimeout(timeOutId);
  }, [timeOutId]);

  return {
    debounce,
  };
};

export default useDebounce;
