import { useEffect, useRef } from "react";

export function usePrev(value) {
  const prevValueRef = useRef();

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef.current;
}
