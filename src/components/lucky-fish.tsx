"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const LuckyFish = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 }); // Default position
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const generatePosition = () => ({
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20,
    });

    const checkAppearance = () => {
      if (!isVisible) {
        const shouldAppear = Math.random() > 0.5;
        if (shouldAppear) {
          setPosition(generatePosition());
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
            setHasInteracted(false);
          }, 10000);
        }
      }
    };

    const interval = setInterval(checkAppearance, 30000);
    return () => clearInterval(interval);
  }, [isVisible, mounted]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      toast("✨ Lucky Fish grants you good fortune!", {
        duration: 5000,
      });

      setTimeout(() => {
        setIsVisible(false);
        setHasInteracted(false);
      }, 2000);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute cursor-pointer z-20"
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            rotate: [0, -10, 10, 0],
          }}
          exit={{ scale: 0, rotate: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleInteraction}
        >
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 512 512"
            className={`${
              hasInteracted ? "text-yellow-400" : "text-yellow-500"
            } transition-colors duration-300`}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <g>
              <path
                d="m153.573 362.431c-36.363 13.123-40.553 52.592-40.553 52.592l5.022 6.809c48.171 26.834 122.356 36.576 192.947-7.63-65.085-2.054-119.66-12.752-157.416-51.771z"
                fill="currentColor"
              />
              <path
                d="m154.603 363.473c-15.315-15.497-27.921-35.541-37.396-61.436-.396-1.082-.859-2.118-1.372-3.117-23.481 9.698-59.778 28.497-49.199 67.67 5.251 19.44 24.173 40.072 51.406 55.242-3.178-34.998 23.086-52.004 36.561-58.359z"
                fill="currentColor"
              />
              <path
                d="m509.879 339.123c3.66-4.705 2.447-11.54-2.601-14.708-11.058-6.94-19.054-15.141-25.993-24.865-13.858-19.421-20.766-42.867-20.794-66.725-.009-8.052-.382-16.1-1.199-23.987-23.386-24.779-85.169-75.78-194.957-71.868-52.857 1.883-92.694 13.906-121.43 27.59 1.515 2.708 3.216 5.452 5.165 8.238 27.631 39.473-10.419 109.403-10.45 171.309 17.886 26.056 41.15 42.771 68.736 53.384l5.647-2.078 49.962 10.645 6.327 5.622.001.001c17.393 2.003 35.788 2.921 55.036 3.222l.002-.002 6.282-3.221 40.434-3.047 9.921 3.936c65.272-7.962 107.986-33.317 124.626-44.951 4.483-3.135 5.63-9.276 2.596-13.828-2.404-3.605-2.231-8.345.43-11.765z"
                fill="currentColor"
              />
              <circle
                cx="383.999"
                cy="234.665"
                r="21.333"
                fill="currentColor"
              />
            </g>
          </motion.svg>
          {!hasInteracted && (
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuckyFish;
