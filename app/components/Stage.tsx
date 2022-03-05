import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import type { MeshProps, Props } from '@react-three/fiber'
import { PresentationControls, ContactShadows, MeshReflectorMaterial } from '@react-three/drei'
import { useTheme } from './Theme'

const { PI } = Math


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

export function Stage (props: Props) {
  const { children, ...other } = props
  const color = useTheme(_ => _.dark? '#101010': '#fff')
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4] }} {...other}>
      <color attach="background" args={[color]} />
      <fog attach="fog" args={[color, 10, 20]} />
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
