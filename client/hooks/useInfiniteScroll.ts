import React, { useState, useEffect, useCallback, useRef } from "react";

const useInfiniteScroll = (targetEl) => {
  const observerRef = useRef(null);
  const [interSecting, setInterSecting] = useState(false);
  // const observer = new IntersectionObserver((entries) =>
  //   setInterSecting(entries.some((entry) => entry.isIntersecting))
  // );

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) =>
        setInterSecting(entries.some((entry) => entry.isIntersecting))
      );
    }
    return observerRef.current;
  }, [observerRef.current]);

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current);

    return () => {
      getObserver().disconnect();
    };
  }, [targetEl.current]);

  return interSecting;
};

export default useInfiniteScroll;
