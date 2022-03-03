import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'

// Based on react-toggle (https://github.com/aaronshaf/react-toggle/).
type ToggleProps = Partial<{
  checked: boolean
  disabled: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  leftIcon: React.ReactNode
  rightIcon: React.ReactNode
}>

const ToggleContainer = styled.div<ToggleProps>`
  touch-action: pan-x;
  position: relative;
  cursor: pointer;
  user-select: none;
  ${_ => _.disabled && css`
    cursor: not-allowed;
    opacity: 0.5;
  `}
`

const ToggleTrack = styled(animated.div)<ToggleProps>`
  width: 5rem;
  height: 2.4rem;
  border-radius: 3rem;
  background-color: #4d4d4d;
  position: relative;
  ${_ => _.disabled && css`:hover {
    transition: all 0.2s ease;
    background-color: #000000;
  }`}
`

const ToggleTrackCheck = styled(animated.div)`
  top: 0;
  bottom: 0;
  width: 1rem;
  height: 1rem;
  margin: auto 0;
  position: absolute;
`

const ToggleIcon = styled.span`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ToggleTrackThumb = styled(animated.div)`
  width: 2.2rem;
  height: 2.2rem;
  border: 0.1rem solid #4d4d4d;
  border-radius: 50%;
  background-color: #fafafa;
  position: absolute;
`

const ToggleScreenReader = styled.input`
  width: 0.1rem;
  height: 0.1rem;
  border: 0;
  margin: -0.1rem;
  clip: rect(0 0 0 0);
  overflow: hidden;
  position: absolute;
`


export function Toggle <T>(props: T & ToggleProps): JSX.Element {
  const { disabled=false, onChange, leftIcon="🌟", rightIcon="🌞", ...other } = props
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = disabled? undefined: () => inputRef.current?.click()
  const [checked, setChecked] = useState(props.checked || false);
  const thumb = useSpring({ left: checked? "2.6rem": "0rem" })
  const right = useSpring({ right: checked? "0rem": "1rem", opacity: checked? "0": "1"})
  const left = useSpring({ left: checked? "0.8rem": "0rem", opacity: checked? "1": "0"})
  return (
    <ToggleContainer disabled={disabled} {...other}>
      <ToggleTrack role="button" tabIndex={-1} onClick={handleClick} disabled={disabled}>
        <ToggleTrackCheck style={left}>
          <ToggleIcon>
            {leftIcon}
          </ToggleIcon>
        </ToggleTrackCheck>
        <ToggleTrackCheck style={right}>
          <ToggleIcon>
            {rightIcon}
          </ToggleIcon>
        </ToggleTrackCheck>
        <ToggleTrackThumb style={thumb}/>
      </ToggleTrack>
      <ToggleScreenReader
        ref={inputRef}
        type="checkbox"
        onChange={onChange}
        onClick={() => void setChecked(!checked)}
        checked={checked}
      />
    </ToggleContainer>
  );
}
