import * as React from 'react'
import { useFrame, } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import type { GroupProps } from '@react-three/fiber'
import * as THREE from 'three'
const { PI } = Math

export function Model (props: GroupProps & { alrt: boolean }) {
  const { children, alrt, ...other } = props
  const ref = React.useRef<THREE.Group>()
  const rot = React.useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/alrt.gltf') as any
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current!.rotation.x = Math.cos(t / 4) / 8 - PI / 6
    ref.current!.rotation.y = Math.sin(t / 4) / 8
    ref.current!.rotation.z = Math.sin(t / 4) / 8
    if (alrt)
      rot.current!.rotation.y += t / 10
  })
  return (
    <group ref={ref} {...other} dispose={null}>
      <mesh geometry={nodes.Base.geometry} material={nodes.Base.material} />
      <mesh geometry={nodes.Glass.geometry} material={materials.Glass} />
      <group ref={rot} dispose={null}>
        <mesh geometry={nodes.Rot.geometry} material={nodes.Rot.material} position={[0, 13, 0]} />
        <mesh geometry={nodes.Bulb.geometry} material={materials.Bulb} position={[0, 13, 0]} />
      </group>
      { children }
    </group>
  )
}
