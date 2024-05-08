import { useEffect, useRef, useState } from "react";

const useDebounceGetPost = (callback, delay = 500) => {
  const timerRef = useRef(null);
  const isProcessing = useRef(false); // Flag to track ongoing work

  return async (...args) => {
    if (isProcessing.current) {
      // Work is already in progress, ignore new requests
      return;
    }

    isProcessing.current = true; // Mark work as in progress

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        await callback(...args); // Execute the async callback
      } finally {
        isProcessing.current = false; // Mark work as completed
      }
    }, delay);
  };
};

export default useDebounceGetPost;
