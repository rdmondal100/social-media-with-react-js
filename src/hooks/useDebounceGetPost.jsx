import { useEffect, useRef, useState } from "react";

const useDebounceGetPost = (callback, delay = 500) => {
  const timerRef = useRef(null);

  return (...args) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebounceGetPost;
