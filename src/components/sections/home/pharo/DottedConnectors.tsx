'use client'

import { useMemo } from 'react'

interface DottedConnectorsProps {
  layers: { y: number }[]
}

export default function DottedConnectors({ layers }: DottedConnectorsProps) {
  const positions = useMemo(() => {
    const pts: number[] = []
    const xs = [-4.5, 4.5]
    const zs = [-2.6, 2.6]

    for (const x of xs) {
      for (const z of zs) {
        for (let i = 0; i < layers.length - 1; i++) {
          const yTop = layers[i].y - 0.15
          const yBot = layers[i + 1].y + 0.15
          const steps = 10
          for (let s = 0; s <= steps; s += 2) {
            const t0 = s / steps
            const t1 = Math.min((s + 1) / steps, 1)
            pts.push(x, yTop + (yBot - yTop) * t0, z)
            pts.push(x, yTop + (yBot - yTop) * t1, z)
          }
        }
      }
    }

    return new Float32Array(pts)
  }, [layers])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#C64444" transparent opacity={0.30} />
    </lineSegments>
  )
}
