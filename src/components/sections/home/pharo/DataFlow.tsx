'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 25

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: (Math.random() - 0.5) * 1.5,
  z: (Math.random() - 0.5) * 1.5,
  speed: 0.4 + Math.random() * 0.6,
  offset: Math.random() * Math.PI * 2,
}))

interface DataFlowProps {
  layers: { y: number }[]
  originY: number
}

export default function DataFlow({ layers, originY }: DataFlowProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const particles = useRef(PARTICLES)

  const minY = Math.min(...layers.map((l) => l.y)) - 0.5
  const range = originY - minY

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    particles.current.forEach((p, i) => {
      const progress = ((t * p.speed * 0.3 + p.offset) % 1)
      const y = originY - progress * range
      dummy.position.set(p.x, y, p.z)
      dummy.scale.setScalar(0.06)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} castShadow>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#C64444" />
    </instancedMesh>
  )
}
