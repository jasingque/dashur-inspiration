import { Canvas } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { CanvasTexture, Mesh, Color, BackSide } from 'three'

// Create realistic Earth texture with accurate continent shapes
const createRealisticEarthTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 4096
  canvas.height = 2048
  const ctx = canvas.getContext('2d')!
  
  // Deep space background
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Add subtle grid for reference
  ctx.strokeStyle = '#111111'
  ctx.lineWidth = 0.5
  ctx.globalAlpha = 0.3
  
  // Latitude lines
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((lat + 90) / 180) * canvas.height
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }
  
  // Longitude lines
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * canvas.width
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
  
  ctx.globalAlpha = 1.0
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 2
  
  // North America (more accurate shape)
  ctx.beginPath()
  ctx.moveTo(800, 400)
  ctx.lineTo(700, 350)
  ctx.lineTo(650, 450)
  ctx.lineTo(750, 600)
  ctx.lineTo(900, 650)
  ctx.lineTo(1000, 550)
  ctx.lineTo(950, 450)
  ctx.lineTo(850, 350)
  ctx.closePath()
  ctx.stroke()
  
  // South America
  ctx.beginPath()
  ctx.moveTo(850, 900)
  ctx.lineTo(800, 1000)
  ctx.lineTo(900, 1400)
  ctx.lineTo(1000, 1350)
  ctx.lineTo(950, 1100)
  ctx.lineTo(900, 950)
  ctx.closePath()
  ctx.stroke()
  
  // Europe
  ctx.beginPath()
  ctx.moveTo(2000, 450)
  ctx.lineTo(1950, 500)
  ctx.lineTo(2050, 600)
  ctx.lineTo(2150, 550)
  ctx.lineTo(2100, 480)
  ctx.lineTo(2050, 420)
  ctx.closePath()
  ctx.stroke()
  
  // Africa
  ctx.beginPath()
  ctx.moveTo(2000, 800)
  ctx.lineTo(1950, 900)
  ctx.lineTo(2050, 1200)
  ctx.lineTo(2200, 1150)
  ctx.lineTo(2150, 850)
  ctx.lineTo(2100, 750)
  ctx.closePath()
  ctx.stroke()
  
  // Asia (larger, more complex)
  ctx.beginPath()
  ctx.moveTo(2400, 400)
  ctx.lineTo(2300, 500)
  ctx.lineTo(2500, 600)
  ctx.lineTo(2800, 550)
  ctx.lineTo(2900, 450)
  ctx.lineTo(2700, 350)
  ctx.lineTo(2500, 380)
  ctx.closePath()
  ctx.stroke()
  
  // Australia
  ctx.beginPath()
  ctx.moveTo(3000, 1200)
  ctx.lineTo(2950, 1300)
  ctx.lineTo(3100, 1400)
  ctx.lineTo(3200, 1350)
  ctx.lineTo(3150, 1250)
  ctx.closePath()
  ctx.stroke()
  
  // Add some major cities as dots
  ctx.fillStyle = '#FFFFFF'
  const cities = [
    { x: 850, y: 450 }, // New York
    { x: 2050, y: 480 }, // London
    { x: 2600, y: 500 }, // Beijing
    { x: 2100, y: 900 }, // Cairo
    { x: 3100, y: 1300 } // Sydney
  ]
  
  cities.forEach(city => {
    ctx.beginPath()
    ctx.arc(city.x, city.y, 3, 0, Math.PI * 2)
    ctx.fill()
  })
  
  // Add grid dots for texture
  ctx.globalAlpha = 0.2
  for (let x = 0; x < canvas.width; x += 40) {
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  return new CanvasTexture(canvas)
}

const earthTexture = createRealisticEarthTexture()

function Globe() {
  const globeRef = useRef<Mesh>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rotationStart, setRotationStart] = useState({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (globeRef.current && !isDragging) {
      globeRef.current.rotation.y += delta * 0.1
    }
  })

  const handlePointerDown = (event: React.PointerEvent) => {
    setIsDragging(true)
    setDragStart({ x: event.clientX, y: event.clientY })
    setRotationStart({ x: rotation.x, y: rotation.y })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!isDragging) return
    
    const deltaX = event.clientX - dragStart.x
    const deltaY = event.clientY - dragStart.y
    
    const newRotationY = rotationStart.y + deltaX * 0.01
    const newRotationX = rotationStart.x + deltaY * 0.01
    
    setRotation({ x: newRotationX, y: newRotationY })
    
    if (globeRef.current) {
      globeRef.current.rotation.x = newRotationX
      globeRef.current.rotation.y = newRotationY
    }
  }

  return (
    <group>
      {/* Main Globe */}
      <Sphere 
        ref={globeRef} 
        args={[5.5, 128, 128]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <meshPhongMaterial 
          map={earthTexture}
          bumpScale={0.02}
          specular={new Color('#444444')}
          shininess={5}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[5.7, 64, 64]}>
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.1}
          side={BackSide}
        />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere args={[6, 64, 64]}>
        <meshBasicMaterial 
          color="#0284c7" 
          transparent 
          opacity={0.05}
          side={BackSide}
        />
      </Sphere>
    </group>
  )
}

export function InteractiveGlobe() {
  return (
    <div className="w-full h-full min-h-[90vh] relative">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <Globe />
      </Canvas>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent rounded-full" />
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full" />
      </div>
    </div>
  )
}
