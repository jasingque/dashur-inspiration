import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const DashurGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const lastPointerX = useRef(0);
  const swipeVelocity = useRef(0);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000 * 2,
      height: 1000 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.05, 0.05, 0.1], // Dark slate matching website theme
      markerColor: [0.5, 0.3, 0.96], // Purple color for highlighted dots
      glowColor: [0.3, 0.8, 1], // Soft cyan glow (unchanged)
      markers: [
        // Add specific coordinates for your office/users here
        { location: [37.7595, -122.4367], size: 0.05 }, // San Francisco - Purple highlight
        { location: [40.7128, -74.006], size: 0.05 }, // New York - Purple highlight
      ],
      onRender: (state) => {
        // Very slow continuous spin with blur effect
        phi += swipeVelocity.current * 0.1; // Much slower spin
        state.phi = phi + pointerInteractionMovement.current;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <canvas
        ref={canvasRef}
        style={{ 
          width: 1000, 
          height: 1000, 
          maxWidth: "100%", 
          aspectRatio: 1,
          filter: 'blur(0.8px)' // Add blur effect
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          lastPointerX.current = e.clientX;
          swipeVelocity.current = 0; // Reset velocity on new grab
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          swipeVelocity.current = 0; // Stop velocity when released
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          swipeVelocity.current = 0; // Stop velocity when leaving
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const deltaX = e.clientX - lastPointerX.current;
            const timeDelta = 16; // Approximate 60fps
            
            // Calculate swipe velocity
            if (lastPointerX.current !== 0) {
              swipeVelocity.current = deltaX / timeDelta;
            }
            
            lastPointerX.current = e.clientX;
            pointerInteractionMovement.current = 0; // Reset movement offset
          }
        }}
        // The "Stop spin on hover" logic
        onMouseEnter={() => (pointerInteracting.current = 0)} 
        onMouseLeave={() => (pointerInteracting.current = null)}
      />
    </div>
  );
};
