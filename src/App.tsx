import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

function getFibonacciSeries(n: number) {
  const lastIndex = n - 1;
  if (lastIndex < 0) return [];
  if (lastIndex === 0) return [1];
  if (lastIndex === 1) return [1, 1];

  const series = [1, 1];

  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series;
}

function App() {
  const [count, setCount] = useState(10);
  const [activeBoxIndex, setActiveBoxIndex] = useState<number>(0);

  const boxNumbers = useMemo(() => getFibonacciSeries(count), [count]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollableWidth = container.scrollWidth - container.clientWidth;

      const scrollPercentage = scrollLeft / scrollableWidth;

      const activeIndex = Math.round(scrollPercentage * (count - 1));

      setActiveBoxIndex(activeIndex);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [count]);

  return (
    <main className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-gray-100">
      <div className="flex gap-2">
        <span>Number of boxes (10 - 50):</span>
        <input
          type="number"
          min={10}
          max={50}
          className="bg-black w-14 text-white ps-2 rounded"
          value={count}
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
        />
      </div>
      <div
        ref={containerRef}
        className="w-[600px] h-20 bg-white shadow-md rounded gap-2 flex items-center overflow-x-auto px-4"
      >
        {boxNumbers.map((boxNumber, index) => (
          <div
            key={index}
            data-id={index}
            className={`shadow-sm shrink-0 size-16 flex items-center hover:scale-105 justify-center cursor-pointer rounded border border-gray-200 ${
              activeBoxIndex === index
                ? "bg-green-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {boxNumber.toLocaleString("en-US")}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
