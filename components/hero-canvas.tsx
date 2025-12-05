"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Stars } from "@react-three/drei"
import type * as THREE from "three"

/**
 * Mouse position tracker for interactive elements
 */
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  if (typeof window !== "undefined") {
    window.addEventListener(
      "mousemove",
      (e) => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        })
      },
      { passive: true },
    )
  }

  return mouse
}

/**
 * Interactive floating icosahedron that responds to mouse
 */
function FloatingGem({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return

    // Smooth rotation following mouse
    const targetRotationY = mouse.x * 0.5
    const targetRotationX = mouse.y * 0.3

    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1

    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation)
      // Pulse glow on hover
      const scale = hovered ? 1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 1.2
      glowRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={[2, 0.5, -1]}>
        {/* Outer glow */}
        <mesh ref={glowRef}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial color="#7356D7" transparent opacity={0.1} wireframe />
        </mesh>
        {/* Main gem */}
        <mesh ref={meshRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={hovered ? "#9b7dff" : "#7356D7"}
            metalness={0.8}
            roughness={0.2}
            emissive="#7356D7"
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

/**
 * Animated particle mesh representing neural network / data flow
 */
function ParticleMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.LineSegments>(null)

  const { positions, linePositions } = useMemo(() => {
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)
    const linePositions: number[] = []

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 1.8 + Math.random() * 0.8

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < 1.0 && linePositions.length < 500) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          )
        }
      }
    }

    return { positions, linePositions: new Float32Array(linePositions) }
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !lineRef.current) return

    // Base rotation + mouse influence
    const baseRotY = state.clock.elapsedTime * 0.08
    const baseRotX = Math.sin(state.clock.elapsedTime * 0.05) * 0.15

    meshRef.current.rotation.y = baseRotY + mouse.x * 0.3
    meshRef.current.rotation.x = baseRotX + mouse.y * 0.2
    lineRef.current.rotation.copy(meshRef.current.rotation)
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[-1.5, 0, 0]}>
        <points ref={meshRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#7356D7" transparent opacity={0.9} sizeAttenuation />
        </points>

        <lineSegments ref={lineRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#7356D7" transparent opacity={0.25} />
        </lineSegments>
      </group>
    </Float>
  )
}

/**
 * Small floating particles around the scene
 */
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 50
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#9b7dff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

/**
 * Scene content with mouse tracking
 */
function SceneContent() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { gl } = useThree()

  // Track mouse position
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [gl])

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#7356D7" />

      <Stars radius={50} depth={50} count={800} factor={2} saturation={0.3} fade speed={0.3} />

      <ParticleMesh mouse={mouse} />
      <FloatingGem mouse={mouse} />
      <FloatingParticles />
    </>
  )
}

/**
 * Hero 3D Canvas - lazy-loaded, responsive
 */
export function HeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        // Enable pointer events for interactive elements
        onPointerMove={() => {}}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
