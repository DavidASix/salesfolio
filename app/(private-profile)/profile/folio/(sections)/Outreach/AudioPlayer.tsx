import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import playPauseAnimation from "@/assets/lottie/playPauseAccent.json";

function Play({ isPlaying, setIsPlaying }) {
  const lottieRef = useRef(null);
  function onClickPlay() {
    lottieRef.current.setSpeed(2);
    lottieRef.current.setDirection(isPlaying ? -1 : 1);
    lottieRef.current.play();
    setIsPlaying(!isPlaying);
  }
  return (
    <button
      className="h-16 w-16 hover:opacity-80 hover:scale-105 transition-all duration-200"
      onClick={onClickPlay}
    >
      <Lottie
        animationData={playPauseAnimation}
        lottieRef={lottieRef}
        loop={false}
        autoplay={false}
      />
    </button>
  );
}

export default function AudioPlayer({ url }) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(url));
  const intervalRef = useRef(null);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? progress / duration : 0;

  const formatDuration = (duration: number) => {
    const mm = Math.floor(duration / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}`;
  };

  useEffect(() => {
    // Occurs after isPlaying is set
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setProgress(audioRef.current.currentTime),
      1000
    );
  };

  const onScrub = (value) => {
    audioRef.current.currentTime = value;
    setProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // if (!isPlaying) {
    //   setIsPlaying(true);
    // }
  };

  return (
    <div className="w-full flex flex-col gap-0 p-4 rounded-2xl">
      <div className="flex justify-center mb-2">
        <Play isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
      <div className="flex justify-between items-center gap-4">
        <span className="font-extralight">{formatDuration(progress)}</span>
        <input
          type="range"
          value={progress}
          step="1"
          min={0}
          max={duration || 0}
          className="range range-accent range-xs flex-1"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
        <span className="font-extralight">{formatDuration(duration)}</span>
      </div>
    </div>
  );
}
