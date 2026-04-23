'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

const MAT = '#D4C9BB'
const EDGE = '#494848'

function EdgeBox({ w, h, d, position }: { w: number; h: number; d: number; position: [number, number, number] }) {
  const geo = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d])
  return (
    <group position={position}>
      <mesh>
        <primitive attach="geometry" object={geo} />
        <meshStandardMaterial color={MAT} flatShading />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[geo]} />
        <lineBasicMaterial color={EDGE} transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

export default function UseCaseObjects() {
  const dividerPoints = useMemo(() => new Float32Array([
    -3.3, 0.01, 0,  3.3, 0.01, 0,
     0, 0.01, -3.3,  0, 0.01, 3.3,
  ]), [])

  return (
    <group position={[0, 0.17, 0]}>

      {/* Brazo robótico — top-left */}
      <group position={[-2, 0, -2]}>
        <EdgeBox w={0.5} h={0.3} d={0.5} position={[0, 0.15, 0]} />
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <mesh position={[0.25, 0.85, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.4, 0.06, 0.06]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
      </group>

      {/* Monitor / ordenador — top-right */}
      <group position={[2, 0, -2]}>
        <EdgeBox w={0.7} h={0.05} d={0.5} position={[0, 0.025, 0]} />
        <EdgeBox w={0.5} h={0.4} d={0.05} position={[0, 0.25, -0.2]} />
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.12, 8]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
      </group>

      {/* Barco — bottom-left */}
      <group position={[-2, 0, 2]}>
        <EdgeBox w={0.8} h={0.15} d={0.3} position={[0, 0.075, 0]} />
        <EdgeBox w={0.3} h={0.22} d={0.2} position={[0.1, 0.26, 0]} />
        <mesh position={[-0.25, 0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
      </group>

      {/* Camión — bottom-right */}
      <group position={[2, 0, 2]}>
        <EdgeBox w={0.6} h={0.32} d={0.32} position={[0.1, 0.16, 0]} />
        <EdgeBox w={0.26} h={0.24} d={0.28} position={[-0.3, 0.12, 0]} />
        <mesh position={[-0.18, 0, 0.15]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 10]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <mesh position={[0.22, 0, 0.15]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 10]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
      </group>

      {/* Líneas divisorias entre cuadrantes */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dividerPoints, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={EDGE} transparent opacity={0.25} />
      </lineSegments>

    </group>
  )
}
