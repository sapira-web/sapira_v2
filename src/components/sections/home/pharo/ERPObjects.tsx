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

export default function ERPObjects() {
  return (
    <group>
      {/* Dashboard panel — top-left */}
      <group position={[-2.0, 0, -1.6]}>
        <EdgeBox w={1.1} h={0.06} d={0.75} position={[0, 0.03, 0]} />
        <EdgeBox w={0.3} h={0.18} d={0.15} position={[-0.35, 0.12, 0.25]} />
        <EdgeBox w={0.3} h={0.28} d={0.15} position={[0, 0.17, 0.25]} />
        <EdgeBox w={0.3} h={0.22} d={0.15} position={[0.35, 0.14, 0.25]} />
      </group>

      {/* Cylinder DB cluster — top-right */}
      <group position={[1.8, 0, -1.6]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.44, 10]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.44, 10]} />
          <meshStandardMaterial color={MAT} flatShading wireframe={false} />
        </mesh>
        <mesh position={[0.4, 0.18, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.36, 10]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <mesh position={[-0.4, 0.14, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.28, 10]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
      </group>

      {/* Torus process ring — center */}
      <group position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.07, 8, 20]} />
          <meshStandardMaterial color={MAT} flatShading />
        </mesh>
        <EdgeBox w={0.15} h={0.4} d={0.15} position={[0, 0.2, 0]} />
      </group>

      {/* Grid matrix — bottom-left */}
      <group position={[-2.0, 0, 1.6]}>
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <EdgeBox
              key={`${row}-${col}`}
              w={0.22}
              h={0.06 + row * 0.04}
              d={0.22}
              position={[(col - 1) * 0.28, (0.06 + row * 0.04) / 2, (row - 1) * 0.28]}
            />
          ))
        )}
      </group>

      {/* Stacked flat slabs — bottom-right */}
      <group position={[1.8, 0, 1.6]}>
        <EdgeBox w={0.8} h={0.07} d={0.55} position={[0, 0.035, 0]} />
        <EdgeBox w={0.7} h={0.07} d={0.45} position={[0, 0.105, 0]} />
        <EdgeBox w={0.6} h={0.07} d={0.38} position={[0, 0.175, 0]} />
        <EdgeBox w={0.5} h={0.07} d={0.30} position={[0, 0.245, 0]} />
      </group>
    </group>
  )
}
