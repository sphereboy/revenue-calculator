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
            <path
              fill="currentColor"
              d="M291.484,113.248c-11.393-32.253-46.776-49.164-79.029-37.771l-61.683,21.789l25.245,71.466 l119.719-43.45L291.484,113.248z"
            />
            <path
              fill="currentColor"
              d="M176.017,343.267l-25.245,71.466l61.683,21.789c32.253,11.393,67.636-5.517,79.029-37.77 l4.251-12.035L176.017,343.267z"
            />
            <path
              fill="currentColor"
              d="M328.793,119.756c-99.049,0-217.351,78.811-249.175,119.559v33.368 c31.823,40.749,150.125,119.559,249.175,119.559C444.378,392.243,512,256,512,256S444.378,119.756,328.793,119.756z"
            />
            <path
              fill="currentColor"
              d="M512,256c0,0-47.006-94.673-129.609-126.174c-25.911,34.944-41.323,78.691-41.323,126.173 s15.411,91.229,41.323,126.174C464.994,350.673,512,256,512,256z"
            />
            <circle fill="#333333" cx="416.24" cy="221.63" r="15" />
            <path
              fill="currentColor"
              d="M33.53,256h-7.088C11.838,256,0,244.162,0,229.558v-62.027h7.994 c41.131,0,74.474,33.343,74.474,74.474v27.989c0,41.131-33.343,74.474-74.474,74.474H0v-62.027C0,267.838,11.838,256,26.442,256"
            />
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
