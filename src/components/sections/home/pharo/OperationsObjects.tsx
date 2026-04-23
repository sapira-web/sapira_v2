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
        <lineBasicMaterial color={EDGE} transparent opacity={0.45} />
      </lineSegments>
    </group>
  )
}

export default function OperationsObjects() {
  return (
    <group>
      {/* Factory with chimneys — top-left */}
      <group position={[-2.0, 0, -1.8]}>
        <EdgeBox w={1.0} h={0.35} d={0.6} position={[0, 0.175, 0]} />
        <mesh position={[-0.3, 0.65, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.6, 8]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <mesh position={[0.1, 0.55, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 0.4, 8]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <mesh position={[0.35, 0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
      </group>

      {/* Office building — top-right */}
      <group position={[2.0, 0, -1.8]}>
        <EdgeBox w={0.55} h={0.9} d={0.45} position={[0, 0.45, 0]} />
        <EdgeBox w={0.3} h={0.5} d={0.4} position={[-0.4, 0.25, 0]} />
        {/* windows */}
        {[0.15, 0.35, 0.55, 0.75].map((yy, i) => (
          <EdgeBox key={i} w={0.1} h={0.06} d={0.02} position={[0.05, yy, -0.22]} />
        ))}
      </group>

      {/* Shipping containers — bottom-left */}
      <group position={[-2.0, 0, 1.8]}>
        <EdgeBox w={0.7} h={0.28} d={0.3} position={[0, 0.14, 0]} />
        <EdgeBox w={0.7} h={0.28} d={0.3} position={[0, 0.42, 0.1]} />
        <EdgeBox w={0.5} h={0.28} d={0.3} position={[-0.4, 0.14, 0.3]} />
      </group>

      {/* Cargo ship — bottom-right */}
      <group position={[2.0, 0, 1.8]}>
        <EdgeBox w={1.1} h={0.18} d={0.38} position={[0, 0.09, 0]} />
        <EdgeBox w={0.4} h={0.28} d={0.32} position={[0.2, 0.32, 0]} />
        <mesh position={[-0.3, 0.38, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.36, 8]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        {/* hull side cut — decorative line */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-0.55, 0.18, 0.19,  0.55, 0.18, 0.19]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={EDGE} transparent opacity={0.5} />
        </lineSegments>
      </group>

      {/* Truck — center */}
      <group position={[0, 0, 0]}>
        <EdgeBox w={0.6} h={0.30} d={0.30} position={[0.15, 0.15, 0]} />
        <EdgeBox w={0.28} h={0.22} d={0.26} position={[-0.28, 0.11, 0]} />
        <mesh position={[-0.18, 0, 0.14]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 10]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <mesh position={[0.22, 0, 0.14]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 10]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
      </group>
    </group>
  )
}
