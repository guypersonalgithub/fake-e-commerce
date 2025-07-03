import { useState, useEffect, useRef } from "react";

const calculateItemsPerRow = (containerWidth: number, itemWidth: number) => {
  return Math.max(Math.floor(containerWidth / itemWidth), 1);
};

export const useMeasureItemsPerRow = <T extends HTMLElement>(
  itemWidth: number,
) => {
  const ref = useRef<T>(null);
  const [itemsPerRow, setItemsPerRow] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === ref.current) {
          const { width } = entry.contentRect;
          setItemsPerRow(calculateItemsPerRow(width, itemWidth));
        }
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [itemWidth]);

  return [ref, itemsPerRow] as const;
};

