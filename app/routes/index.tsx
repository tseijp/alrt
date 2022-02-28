import React from 'react'
import { useRef } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { useGLTF, Environment, PresentationControls, ContactShadows, MeshReflectorMaterial } from '@react-three/drei'
import type { GroupProps, MeshProps, Props } from '@react-three/fiber'
import * as THREE from 'three'

const { PI } = Math

function Model (props: GroupProps) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/alrt.gltf') as any
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current!.rotation.x = -PI / 1.75 + Math.cos(t / 4) / 8
    ref.current!.rotation.y = Math.sin(t / 4) / 8
    ref.current!.rotation.z = -(1 + Math.sin(t / 1.5)) / 20
  })
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Base.geometry} material={nodes.Base.material} />
      <mesh geometry={nodes.Glass.geometry} material={materials.Glass} position={[0, 0, -2.74]} />
      <mesh geometry={nodes.Rot.geometry} material={nodes.Rot.material} position={[0, 0, 7.39]} />
      <mesh geometry={nodes.Bulb.geometry} material={materials.Bulb} position={[0, -3.53, 13.04]} />
    </group>
  )
}

const Reflector = (props: MeshProps) => (
  <mesh {...props}>
    <planeGeometry args={[170, 170]} />
    {/* @ts-ignore */}
    <MeshReflectorMaterial
      blur={[300, 100]}
      resolution={2048}
      mixBlur={1}
      mixStrength={40}
      roughness={1}
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#101010"
      metalness={0.5}
    />
  </mesh>
)

function Stage (props: Props) {
  const { children, ...other } = props
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4] }} {...other}>
      <color attach="background" args={['#101010']} />
      <fog attach="fog" args={['#101010', 10, 20]} />
      <ambientLight intensity={.5} />
      <spotLight position={10} angle={.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow/>
      <Reflector position-y={-1} rotation-x={-PI / 2} />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 } as any}
        rotation-y={0.3}
        polar={[-PI / 3, PI / 3]}
        azimuth={[-PI / 1.4, PI / 2]}
        children={children}
      />
      <ContactShadows
        rotation-x={PI / 2}
        position={[0, -1.4, 0]}
        opacity={0.75}
        width={10}
        height={10}
        blur={2.6}
        far={2}
      />
    </Canvas>
  )
}

export default function App () {
  return (
    <Stage style={{position: 'fixed', top: 0, left: 0}}>
      <React.Suspense fallback={null}>
        <Environment preset="city" />
        <Model scale={0.1} position-y={-0.5} />
      </React.Suspense>
    </Stage>
  )
}
