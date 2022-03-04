import * as React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

export const ThemeContext = React.createContext<ThemeProps>({})
export const ThemeProvider = ThemeContext.Provider
export const useTheme = () => React.useContext(ThemeContext)
export type ThemeProps = Partial<{
  dark: boolean
  mute: boolean
}>

export interface Theme {
  <Props>(props: Props): null | JSX.Element
  Text: <Props>(props: Props) => null | JSX.Element
  Title: <Props>(props: Props) => null | JSX.Element
  Flex: <Props>(props: Props & FlexProps) => null | JSX.Element
}

export const Theme = (props: {theme: ThemeProps, children: React.ReactNode}) => {
  // return props.children
  const { theme, ...other } = props
  return <ThemeProvider value={theme} {...other} />
}

Theme.Title = styled(animated.h1)`
  font-size: 8rem;
  width: 100%;
`

Theme.Text = styled(animated.div)`
  font-size: 4rem;
  width: 100%;
`

export type FlexProps = Partial<{
  $w: number|string
  $h: number|string
  $p: number|string
  $m: number|string
  $wrap: boolean
  $row: boolean
  $red: boolean
  $end: boolean
  $start: boolean
  $gap: string
}>

Theme.Flex = styled.div<FlexProps>`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  ${({$wrap}) => $wrap && `flex-wrap: wrap;`}
  ${({$gap}) => $gap && `gap: ${$gap};`}
  ${({$red}) => $red && `background: red;`}
  ${({$row}) => `flex-direction: ${$row? "row": "column"};`}
  ${({$w}) => `width: ${$w || '100%'};`}
  ${({$h}) => `height: ${$h || '100%'};`}
  ${({$m}) => `margin: ${$m || 'auto'};`}
  ${({$p}) => `padding: ${$p || 'auto'};`}
`
