'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SapiraCore({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const outerGlowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4
      meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.12
    }

    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.2
      glowRef.current.scale.set(scale, scale, scale)
    }

    if (outerGlowRef.current) {
      const scale = 1 + Math.sin(t * 1.2 + 1) * 0.25
      outerGlowRef.current.scale.set(scale, scale, scale)
      outerGlowRef.current.rotation.y = t * 0.2
    }
  })

  return (
    <group position={position}>
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#C64444" transparent opacity={0.08} />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#C64444" transparent opacity={0.18} />
      </mesh>

      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#C64444"
          emissive="#C64444"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}
