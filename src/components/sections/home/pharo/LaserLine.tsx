'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface LaserLineProps {
  y: number
  width?: number
  depth?: number
}

export default function LaserLine({ y, width = 7, depth = 4 }: LaserLineProps) {
  const matRef = useRef<THREE.LineBasicMaterial>(null)

  useFrame((state) => {
    if (!matRef.current) return
    const t = state.clock.elapsedTime
    matRef.current.opacity = 0.55 + Math.sin(t * 1.8) * 0.25
  })

  const hw = width / 2
  const hd = depth / 2
  const pts = new Float32Array([
    -hw, y, -hd,
     hw, y, -hd,
     hw, y,  hd,
    -hw, y,  hd,
    -hw, y, -hd,
  ])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <lineBasicMaterial ref={matRef} color="#C64444" transparent opacity={0.7} />
    </line>
  )
}
