'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Layer from './pharo/Layer'
import SapiraCore from './pharo/SapiraCore'
import FlowArrows from './pharo/FlowArrows'
import DataFlow from './pharo/DataFlow'
import LaserLine from './pharo/LaserLine'
import DottedConnectors from './pharo/DottedConnectors'

const LAYERS = [
  { y:  4.5, color: '#EFEBE6', label: 'USE CASES' },
  { y:  1.5, color: '#E8E2DA', label: 'APPLICATIONS' },
  { y: -1.5, color: '#E0D8CE', label: 'ERP' },
  { y: -4.5, color: '#D8D0C4', label: 'OPERATIONS' },
]

const CORE_Y = 6.2

function CameraRig() {
  const { camera, gl } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef(new THREE.Vector3())

  useEffect(() => {
    const el = gl.domElement
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [gl.domElement])

  // eslint-disable-next-line react-hooks/immutability
  useFrame(() => {
    target.current.set(mouse.current.x * 1.2, mouse.current.y * 0.5, 0)
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x += (target.current.x - camera.position.x) * 0.035
    camera.position.y += (target.current.y * 0.4 - camera.position.y) * 0.035
    camera.lookAt(0, 0.5, 0)
  })

  return null
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} castShadow />
      <pointLight position={[0, CORE_Y, 0]} color="#C64444" intensity={3} distance={10} />

      <CameraRig />

      {LAYERS.map((layer, i) => (
        <Layer
          key={i}
          index={i}
          position={[0, layer.y, 0]}
          width={9}
          depth={5.5}
          color={layer.color}
        />
      ))}

      <SapiraCore position={[0, CORE_Y, 0]} />

      {/* Pulsing laser perimeter at top-layer surface */}
      <LaserLine y={LAYERS[0].y + 0.16} width={9} depth={5.5} />

      {/* Dotted vertical connectors between layers */}
      <DottedConnectors layers={LAYERS} />

      <FlowArrows layers={LAYERS} />

      <DataFlow layers={LAYERS} originY={CORE_Y} />
    </>
  )
}

export default function PharoArchitecture() {
  return (
    <div className="relative w-full h-full">
      {/* Layer labels — left side */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {[
          { top: '8%',  label: 'USE CASES' },
          { top: '33%', label: 'APPLICATIONS' },
          { top: '58%', label: 'ERP' },
          { top: '82%', label: 'OPERATIONS' },
        ].map(({ top, label }) => (
          <div
            key={label}
            className="absolute left-8"
            style={{ top, fontSize: '11px', fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(73,72,72,0.70)' }}
          >
            {label}
          </div>
        ))}
      </div>

      <Canvas
        orthographic
        camera={{ position: [10, 8, 10], zoom: 52, near: 0.1, far: 200 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
