'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

const MAT = '#D4C9BB'
const EDGE = '#494848'

const APPS = [
  { label: 'MAINFRAME', w: 0.7, h: 0.55, d: 0.4, pos: [-2.2, 0, -1.8] as [number, number, number] },
  { label: 'ORACLE',    w: 0.5, h: 0.40, d: 0.4, pos: [-1.1, 0, -1.8] as [number, number, number] },
  { label: 'DB2',       w: 0.5, h: 0.45, d: 0.4, pos: [ 0.0, 0, -1.8] as [number, number, number] },
  { label: 'SAP',       w: 0.6, h: 0.50, d: 0.4, pos: [ 1.1, 0, -1.8] as [number, number, number] },
  { label: 'DYNAMICS',  w: 0.5, h: 0.35, d: 0.4, pos: [ 2.2, 0, -1.8] as [number, number, number] },
  { label: 'CRM',       w: 0.55, h: 0.42, d: 0.4, pos: [-2.2, 0,  0.0] as [number, number, number] },
  { label: 'ERP',       w: 0.65, h: 0.48, d: 0.4, pos: [-1.1, 0,  0.0] as [number, number, number] },
  { label: 'WMS',       w: 0.5, h: 0.38, d: 0.4, pos: [ 1.1, 0,  0.0] as [number, number, number] },
  { label: 'MES',       w: 0.55, h: 0.44, d: 0.4, pos: [ 2.2, 0,  0.0] as [number, number, number] },
  { label: 'BI',        w: 0.6, h: 0.36, d: 0.4, pos: [-2.2, 0,  1.8] as [number, number, number] },
  { label: 'ETL',       w: 0.5, h: 0.50, d: 0.4, pos: [-1.1, 0,  1.8] as [number, number, number] },
  { label: 'API',       w: 0.55, h: 0.40, d: 0.4, pos: [ 0.0, 0,  1.8] as [number, number, number] },
  { label: 'CLOUD',     w: 0.6, h: 0.45, d: 0.4, pos: [ 1.1, 0,  1.8] as [number, number, number] },
  { label: 'SRM',       w: 0.5, h: 0.38, d: 0.4, pos: [ 2.2, 0,  1.8] as [number, number, number] },
]

function AppBlock({ w, h, d, position }: { w: number; h: number; d: number; position: [number, number, number] }) {
  const geo = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d])
  return (
    <group position={[position[0], position[1] + h / 2 + 0.05, position[2]]}>
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

export default function ApplicationObjects() {
  return (
    <group>
      {APPS.map((app) => (
        <AppBlock key={app.label} w={app.w} h={app.h} d={app.d} position={app.pos} />
      ))}
    </group>
  )
}
