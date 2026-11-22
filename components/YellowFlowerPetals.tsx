'use client';

import React, { useEffect, useRef } from 'react';

export default function YellowFlowerPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Pause rendering when Haldi section is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let cssWidth = canvas.parentElement?.clientWidth || window.innerWidth;
    let cssHeight = canvas.parentElement?.clientHeight || window.innerHeight;

    const setupCanvas = () => {
      if (!canvas || !ctx) return;
      cssWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      cssHeight = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    const petalCount = 42;
    const petals: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      swing: number;
      swingSpeed: number;
      color: string;
      isFlower: boolean;
    }> = [];

    // Authentic festive Haldi marigold colors (golden yellow, warm saffron, bright marigold)
    const marigoldColors = [
      '#FFD200', // Pure Golden Yellow
      '#FFC000', // Rich Amber Yellow
      '#FFA500', // Saffron Orange
      '#FFB300', // Warm Sunlight Yellow
      '#F59E0B', // Marigold Amber
      '#FBBF24', // Delicate Yellow
      '#EAB308', // Traditional Pitambari
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * cssWidth,
        y: Math.random() * cssHeight,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.6 + 0.9,
        speedX: Math.random() * 0.9 - 0.45,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.2,
        opacity: Math.random() * 0.35 + 0.65,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.03 + 0.018,
        color: marigoldColors[Math.floor(Math.random() * marigoldColors.length)],
        isFlower: Math.random() > 0.75, // Some are full mini-blossom tufts
      });
    }

    const drawMarigoldPetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      color: string,
      isFlower: boolean
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      if (isFlower) {
        // Draw delicate marigold mini-blossom with layered petals
        const petalRadius = size * 0.55;
        for (let j = 0; j < 6; j++) {
          ctx.beginPath();
          const angle = (j * Math.PI) / 3;
          ctx.arc(
            Math.cos(angle) * (size * 0.45),
            Math.sin(angle) * (size * 0.45),
            petalRadius,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        // Center pistil in deep warm saffron
        ctx.beginPath();
        ctx.fillStyle = '#E65100';
        ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw elongated curved marigold petal
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(size * 0.7, -size * 0.5, size * 0.8, size * 0.6, 0, size * 1.1);
        ctx.bezierCurveTo(-size * 0.8, size * 0.6, -size * 0.7, -size * 0.5, 0, -size);
        ctx.closePath();
        ctx.fill();

        // Delicate inner spine highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.7);
        ctx.lineTo(0, size * 0.7);
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, cssWidth, cssHeight);

        petals.forEach((p) => {
          p.swing += p.swingSpeed;
          p.x += Math.sin(p.swing) * 1.3 + p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          if (p.y > cssHeight + 25) {
            p.y = -25;
            p.x = Math.random() * cssWidth;
          }

          drawMarigoldPetal(
            p.x,
            p.y,
            p.size,
            p.rotation,
            p.opacity,
            p.color,
            p.isFlower
          );
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setupCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}
