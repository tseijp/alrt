import React, { useState } from 'react'
// import { useTheme } from 'styled-components'
import { Html, Environment } from '@react-three/drei'
import { Theme } from '../components/Theme'
import { Toggle } from '../components/Toggle'
import { Stage } from '../components/Stage'
import { Model } from '../components/Model'

const { PI } = Math

export default function App () {
  const [dark, setDark] = useState(true)
  const [mute, setMute] = useState(true)
  const [alrt, setAlrt] = useState(true)
  return (
    <Theme theme={{dark, mute, alrt}}>
      <Theme.Flex $end>
        <Theme.Flex $row $m="1rem" $gap="1rem">
          <Toggle leftIcon="🌟" rightIcon="🌞" checked={dark} onChange={e => setDark(e.target.checked)}/>
          <Toggle leftIcon="🔈" rightIcon="🔊" checked={mute} onChange={e => setMute(e.target.checked)}/>
          <Toggle leftIcon="🚨" rightIcon="👀" checked={alrt} onChange={e => setAlrt(e.target.checked)}/>
        </Theme.Flex>
        <Stage style={{position: 'absolute', top: 0, left: 0, zIndex: -1}}>
          <React.Suspense fallback={null}>
            <Environment preset="city" />
            <Model scale={0.1} alrt={alrt}>
              <Html center transform position-y={1} rotation-x={PI/2}>
                <Theme.Flex $row $gap="1rem" $w="50rem">
                  <Theme.Title>404</Theme.Title>
                  <Theme.Text>This is not the web page you are looking for.</Theme.Text>
                </Theme.Flex>
              </Html>
            </Model>
          </React.Suspense>
        </Stage>
      </Theme.Flex>
    </Theme>
  )
}
