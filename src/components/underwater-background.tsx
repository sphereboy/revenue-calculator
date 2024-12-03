"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Fish = {
  id: number;
  x: number;
  y: number;
  scale: number;
  speed: number;
  delay: number;
  type: "fish1" | "fish2" | "fish3";
  verticalOffset: number;
  rotationOffset: number;
  amplitude: number;
};

const FishSvg = ({ type }: { type: Fish["type"] }) => {
  const fishTypes = {
    fish1: (
      <g>
        <path
          d="M510.646,261.469C468.003,185.134,397.9,138.456,315.733,129.806c-41.195-52.03-170.456-65.211-176.035-65.754 c-3.635-0.375-7.292,1.208-9.521,4.167c-2.24,2.938-2.792,6.833-1.458,10.281c12.673,32.896,25.656,70.313,29.092,85.621 c-23.473,10.741-43.99,22.163-57.217,31.681c-28.688-45.896-87.25-46.469-89.927-46.469C4.771,149.333,0,154.104,0,160 c0,61.802,21.542,92.823,35.948,106.667C21.542,280.51,0,311.531,0,373.333C0,379.229,4.771,384,10.667,384 c2.677,0,61.24-0.573,89.927-46.469c17.573,12.646,47.957,28.637,81.159,41.931c-7.337,11.867-11.086,30.742-11.086,57.871 c0,5.896,4.771,10.667,10.667,10.667c3.172,0,75.708-0.629,111.832-43.003c91.87-1.775,170.978-49.891,217.48-133.133 C512.448,268.635,512.448,264.698,510.646,261.469z M154.906,87.417c35.841,5.188,94.682,17.952,127.934,40.799 c-30.66,1.198-69.78,12.79-105.243,27.336C172.875,136.802,162.398,107.509,154.906,87.417z M192.25,426.052 c1.421-29.671,8.267-37.254,10.186-38.806c20.786,7.296,41.846,13.094,60.969,16.004 C240.266,419.531,208.723,424.598,192.25,426.052z"
          fill="currentColor"
        />
        <path
          d="M320,266.666c0-49.083,19.365-79.146,19.563-79.448c3.229-4.917,1.875-11.521-3.021-14.771 c-4.896-3.229-11.5-1.906-14.75,2.969c-0.948,1.417-23.125,35.333-23.125,91.25c0,55.917,22.177,89.833,23.125,91.25 c2.052,3.083,5.438,4.75,8.885,4.75c2.031,0,4.083-0.583,5.906-1.792c4.906-3.271,6.229-9.885,2.958-14.792 C339.344,345.792,320,316.198,320,266.666z"
          fill="currentColor"
        />
        <path
          d="M293.875,172.448c-4.906-3.229-11.49-1.906-14.75,2.969C278.177,176.833,256,210.75,256,266.666 c0,29.865,6.437,53.333,11.844,67.76c1.604,4.281,5.667,6.927,9.99,6.927c1.24,0,2.51-0.219,3.74-0.677 c5.521-2.063,8.313-8.208,6.25-13.729c-4.781-12.781-10.49-33.615-10.49-60.281c0-49.083,19.365-79.146,19.563-79.448 C300.125,182.302,298.771,175.698,293.875,172.448z"
          fill="currentColor"
        />
        <circle cx="383.999" cy="234.665" r="21.333" fill="currentColor" />
      </g>
    ),
    fish2: (
      <g transform="scale(-0.8, 0.8)">
        <path
          d="M510.646,261.469C468.003,185.134,397.9,138.456,315.733,129.806c-41.195-52.03-170.456-65.211-176.035-65.754 c-3.635-0.375-7.292,1.208-9.521,4.167c-2.24,2.938-2.792,6.833-1.458,10.281c12.673,32.896,25.656,70.313,29.092,85.621 c-23.473,10.741-43.99,22.163-57.217,31.681c-28.688-45.896-87.25-46.469-89.927-46.469C4.771,149.333,0,154.104,0,160 c0,61.802,21.542,92.823,35.948,106.667C21.542,280.51,0,311.531,0,373.333C0,379.229,4.771,384,10.667,384 c2.677,0,61.24-0.573,89.927-46.469c17.573,12.646,47.957,28.637,81.159,41.931c-7.337,11.867-11.086,30.742-11.086,57.871 c0,5.896,4.771,10.667,10.667,10.667c3.172,0,75.708-0.629,111.832-43.003c91.87-1.775,170.978-49.891,217.48-133.133 C512.448,268.635,512.448,264.698,510.646,261.469z"
          fill="currentColor"
        />
        <circle cx="383.999" cy="234.665" r="21.333" fill="currentColor" />
      </g>
    ),
    fish3: (
      <g transform="scale(0.6, 0.6)">
        <path
          d="M510.646,261.469C468.003,185.134,397.9,138.456,315.733,129.806c-41.195-52.03-170.456-65.211-176.035-65.754 c-3.635-0.375-7.292,1.208-9.521,4.167c-2.24,2.938-2.792,6.833-1.458,10.281c12.673,32.896,25.656,70.313,29.092,85.621 c-23.473,10.741-43.99,22.163-57.217,31.681c-28.688-45.896-87.25-46.469-89.927-46.469C4.771,149.333,0,154.104,0,160 c0,61.802,21.542,92.823,35.948,106.667C21.542,280.51,0,311.531,0,373.333C0,379.229,4.771,384,10.667,384 c2.677,0,61.24-0.573,89.927-46.469c17.573,12.646,47.957,28.637,81.159,41.931c-7.337,11.867-11.086,30.742-11.086,57.871 c0,5.896,4.771,10.667,10.667,10.667c3.172,0,75.708-0.629,111.832-43.003c91.87-1.775,170.978-49.891,217.48-133.133 C512.448,268.635,512.448,264.698,510.646,261.469z"
          fill="currentColor"
        />
        <circle cx="383.999" cy="234.665" r="21.333" fill="currentColor" />
      </g>
    ),
  };

  return fishTypes[type];
};

const UnderwaterBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [fishes, setFishes] = useState<Fish[]>([]);

  useEffect(() => {
    const generateFishes = () => {
      const newFishes: Fish[] = [];
      const fishTypes: Fish["type"][] = ["fish1", "fish2", "fish3"];

      for (let i = 0; i < 15; i++) {
        newFishes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: 0.5 + Math.random() * 1.5,
          speed: 20 + Math.random() * 40,
          delay: Math.random() * -20,
          type: fishTypes[Math.floor(Math.random() * fishTypes.length)],
          verticalOffset: Math.random() * 4,
          rotationOffset: Math.random() * 4,
          amplitude: 1 + Math.random() * 2,
        });
      }
      setFishes(newFishes);
    };

    generateFishes();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-purple-50/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-blue-50/10 to-transparent" />

      {/* Bubbles */}
      <AnimatePresence>
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => {
              const randomX = `${Math.random() * 100}%`;
              const randomScale = 0.5 + Math.random() * 1;
              const randomDuration = 10 + Math.random() * 20;
              const randomDelay = Math.random() * -30;

              return (
                <motion.div
                  key={`bubble-${i}`}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  initial={{ x: randomX, y: "100vh", scale: randomScale }}
                  animate={{
                    y: "-20vh",
                    transition: {
                      duration: randomDuration,
                      repeat: Infinity,
                      delay: randomDelay,
                    },
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Fish */}
      <AnimatePresence>
        {mounted &&
          fishes.map((fish) => (
            <motion.div
              key={fish.id}
              className="absolute"
              style={{
                width: 0,
                height: 0,
              }}
              initial={{ x: "-10vw", y: `${fish.y}vh` }}
              animate={{
                x: "110vw",
                y: [
                  `${fish.y}vh`,
                  `${fish.y + fish.amplitude}vh`,
                  `${fish.y - fish.amplitude}vh`,
                  `${fish.y}vh`,
                ],
                transition: {
                  x: {
                    duration: fish.speed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: fish.delay,
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.33, 0.66, 1],
                    delay: fish.verticalOffset,
                  },
                },
              }}
            >
              <motion.svg
                width={48 * fish.scale}
                height={48 * fish.scale}
                viewBox="0 0 512 512"
                className="text-blue-400/30"
                initial={{ rotate: 0 }}
                animate={{
                  rotate: [0, -2, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.33, 0.66, 1],
                  delay: fish.rotationOffset,
                }}
              >
                <FishSvg type={fish.type} />
              </motion.svg>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default UnderwaterBackground;
