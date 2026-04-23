'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import UseCaseObjects from './UseCaseObjects'
import ApplicationObjects from './ApplicationObjects'
import ERPObjects from './ERPObjects'
import OperationsObjects from './OperationsObjects'

interface LayerProps {
  position: [number, number, number]
  width: number
  depth: number
  color: string
  index: number
}

const THEMED = [UseCaseObjects, ApplicationObjects, ERPObjects, OperationsObjects]

export default function Layer({ position, width, depth, color, index }: LayerProps) {
  const geo = useMemo(() => new THREE.BoxGeometry(width, 0.3, depth), [width, depth])

  const ThemeObjects = THEMED[index] ?? null

  return (
    <group position={position}>
      {/* Platform slab */}
      <mesh receiveShadow>
        <primitive attach="geometry" object={geo} />
        <meshStandardMaterial color={color} flatShading roughness={0.75} metalness={0.08} />
      </mesh>
      {/* Slab edges */}
      <lineSegments>
        <edgesGeometry args={[geo]} />
        <lineBasicMaterial color="#494848" transparent opacity={0.18} />
      </lineSegments>

      {/* Corner pillars connecting to layer below (all except top) */}
      {index > 0 && (
        <>
          {([ [-width / 2, -depth / 2], [width / 2, -depth / 2], [-width / 2, depth / 2], [width / 2, depth / 2] ] as [number, number][]).map(([cx, cz], pi) => (
            <mesh key={pi} position={[cx, -0.65, cz]}>
              <boxGeometry args={[0.12, 1.0, 0.12]} />
              <meshStandardMaterial color="#C1BDB6" flatShading />
            </mesh>
          ))}
        </>
      )}

      {/* Themed objects for this layer (sit above slab surface at y=0.15) */}
      {ThemeObjects && (
        <group position={[0, 0.15, 0]}>
          <ThemeObjects />
        </group>
      )}
    </group>
  )
}
