'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FlowArrowsProps {
  layers: { y: number }[]
}

export default function FlowArrows({ layers }: FlowArrowsProps) {
  const leftGroupRef = useRef<THREE.Group>(null)
  const rightGroupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (leftGroupRef.current) {
      leftGroupRef.current.children.forEach((child, i) => {
        child.rotation.z = t * 0.3 + i * 0.5
      })
    }
    if (rightGroupRef.current) {
      rightGroupRef.current.children.forEach((child, i) => {
        child.rotation.z = -t * 0.3 + i * 0.5
      })
    }
  })

  const midPoints = []
  for (let i = 0; i < layers.length - 1; i++) {
    midPoints.push((layers[i].y + layers[i + 1].y) / 2)
  }

  return (
    <>
      <group ref={leftGroupRef}>
        {midPoints.map((y, i) => (
          <group key={`left-${i}`} position={[-4.5, y, 0]}>
            <mesh>
              <torusGeometry args={[0.28, 0.02, 8, 32]} />
              <meshStandardMaterial color="#494848" opacity={0.55} transparent />
            </mesh>
            <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI / 4]}>
              <coneGeometry args={[0.05, 0.12, 8]} />
              <meshStandardMaterial color="#494848" opacity={0.7} transparent />
            </mesh>
          </group>
        ))}
      </group>

      <group ref={rightGroupRef}>
        {midPoints.map((y, i) => (
          <group key={`right-${i}`} position={[4.5, y, 0]}>
            <mesh>
              <torusGeometry args={[0.28, 0.02, 8, 32]} />
              <meshStandardMaterial color="#494848" opacity={0.55} transparent />
            </mesh>
            <mesh position={[0, -0.28, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <coneGeometry args={[0.05, 0.12, 8]} />
              <meshStandardMaterial color="#494848" opacity={0.7} transparent />
            </mesh>
          </group>
        ))}
      </group>
    </>
  )
}
