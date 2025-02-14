import React, { useRef, useEffect, useState } from 'react';

type PlayerState = 'cast' | 'idle' | 'pull';

export default function Canvas() {
  const playerUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/doan4zvnovhmajpjezzs';
  const boatUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/dxh2uwe5frhdgjujllto';
  const waveUrl =
    'https://res.cloudinary.com/dqvlnzw9f/image/upload/f_auto,q_auto/v1/Triton/assets/dv9mer4to6j8fe6g3z9e';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameFrameRef = useRef<number>(0);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const playerImage = new Image();
    const boatImage = new Image();
    const waveImage = new Image();

    playerImage.src = playerUrl;
    boatImage.src = boatUrl;
    waveImage.src = waveUrl;

    const spriteWidth = 568;
    const spriteHeight = 570;
    const spriteScale = 0.6;

    const boatWidth = 1080;
    const boatHeight = 1080;
    const boatScale = 0.3;

    const waveWidth = 568;
    const waveHeight = 570;
    const waveScale = 0.55;

    let staggerFrames = 10;
    let waveStaggerFrames = 35;

    type SpriteAnimation = {
      frames: number;
      loc: { x: number; y: number }[];
    };

    const spriteAnimations: Record<PlayerState, SpriteAnimation> = {
      cast: { frames: 12, loc: [] },
      idle: { frames: 3, loc: [] },
      pull: { frames: 12, loc: [] },
    };

    Object.keys(spriteAnimations).forEach((key, index) => {
      const typedKey = key as PlayerState;
      for (let j = 0; j < spriteAnimations[typedKey].frames; j++) {
        spriteAnimations[typedKey].loc.push({
          x: j * spriteWidth,
          y: index * spriteHeight,
        });
      }
    });

    let imagesLoaded = 0;
    const checkAllImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === 3) {
        requestAnimationFrame(animate);
      }
    };

    playerImage.onload = checkAllImagesLoaded;
    boatImage.onload = checkAllImagesLoaded;
    waveImage.onload = checkAllImagesLoaded;

    const animate = () => {
      resizeCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (playerState === 'idle') {
        staggerFrames = 25;
      } else {
        staggerFrames = 17;
      }

      const frame =
        Math.floor(gameFrameRef.current / staggerFrames) %
        spriteAnimations[playerState].loc.length;
      const frameX = spriteWidth * frame;
      const frameY = spriteAnimations[playerState].loc[frame].y;

      const scaledWidth = spriteWidth * spriteScale;
      const scaledHeight = spriteHeight * spriteScale;

      const scaledBoatWidth = boatWidth * boatScale;
      const scaledBoatHeight = boatHeight * boatScale;

      const scaledWaveWidth = waveWidth * waveScale;
      const scaledWaveHeight = waveHeight * waveScale;

      const centerX = canvas.width * 0.15;
      const centerY = canvas.height * 0.35;
      const boatX = centerX - 25;
      const boatY = centerY + scaledHeight - 250;
      const waveX = boatX - 10;
      const waveY = boatY - 80;

      ctx.drawImage(
        playerImage,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        centerX,
        centerY,
        scaledWidth,
        scaledHeight,
      );

      ctx.save();
      ctx.translate(boatX + scaledBoatWidth / 2, boatY + scaledBoatHeight / 2);
      ctx.scale(-1, 1);
      ctx.drawImage(
        boatImage,
        -scaledBoatWidth / 2,
        -scaledBoatHeight / 2,
        scaledBoatWidth,
        scaledBoatHeight,
      );
      ctx.restore();

      const waveFrame =
        Math.floor(gameFrameRef.current / waveStaggerFrames) % 3;
      const waveFrameX = waveFrame * waveWidth;

      ctx.drawImage(
        waveImage,
        waveFrameX,
        0,
        waveWidth,
        waveHeight,
        waveX,
        waveY,
        scaledWaveWidth,
        scaledWaveHeight,
      );

      gameFrameRef.current++;
      requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block absolute w-screen h-screen"
    ></canvas>
  );
}
