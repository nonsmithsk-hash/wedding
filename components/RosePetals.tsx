'use client';

import React, { useEffect, useRef } from 'react';

export default function RosePetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Use IntersectionObserver to pause rendering when canvas is not on screen
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

    const petalCount = 35;
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
    }> = [];

    const colors = [
      '#880816',
      '#a81024',
      '#c21833',
      '#6b0510',
      '#b82038',
      '#d93850',
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * cssWidth,
        y: Math.random() * cssHeight,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.5 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.4 + 0.6,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.03 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawPetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size / 2, -size / 2, size, -size / 4, size, size / 2);
      ctx.bezierCurveTo(size, size, size / 2, size * 1.2, 0, size * 1.1);
      ctx.bezierCurveTo(-size / 2, size * 1.2, -size, size, -size, size / 2);
      ctx.bezierCurveTo(-size, -size / 4, -size / 2, -size / 2, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, cssWidth, cssHeight);

        petals.forEach((p) => {
          p.swing += p.swingSpeed;
          p.x += Math.sin(p.swing) * 1.2 + p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          if (p.y > cssHeight + 20) {
            p.y = -20;
            p.x = Math.random() * cssWidth;
          }

          drawPetal(p.x, p.y, p.size, p.rotation, p.opacity, p.color);
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
