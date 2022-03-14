import * as React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

export const ThemeContext = React.createContext<ThemeProps>({})
export const ThemeProvider = ThemeContext.Provider

export function useTheme (fun?: undefined): ThemeProps
export function useTheme <T>(fun: (theme: ThemeProps) => T): T
export function useTheme <T>(fun?: (theme: ThemeProps) => T) {
  const isFun = typeof fun === 'function'
  const theme = React.useContext(ThemeContext)
  return isFun? fun(theme): theme
}

export type ThemeProps = Partial<{
  dark: boolean
  mute: boolean
  alrt: boolean
}>

export interface Theme {
  <Props>(props: Props): null | JSX.Element
  Text: <Props>(props: Props) => null | JSX.Element
  Title: <Props>(props: Props) => null | JSX.Element
  Flex: <Props>(props: Props & FlexProps) => null | JSX.Element
}

export const Theme = (props: {theme: ThemeProps, children: React.ReactNode}) => {
  const { theme, ...other } = props
  return <ThemeProvider value={theme} {...other} />
}

export function useThemeAttrs <Props>(props: Props & {theme: ThemeProps}) {
  props.theme = useTheme()
  return props
}

Theme.Title = styled(animated.h1).attrs(useThemeAttrs)`
  font-size: 8rem;
  color: #2f2f2f;
  width: 100%;
`

Theme.Text = styled(animated.div).attrs(useThemeAttrs)`
  font-size: 4rem;
  color: #2f2f2f;
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

Theme.Flex = styled.div.attrs(useThemeAttrs)<FlexProps>`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  ${$ => $.$wrap && `flex-wrap: wrap;`}
  ${$ => $.$gap && `gap: ${$.$gap};`}
  ${$ => $.$red && `background: red;`}
  ${$ => `flex-direction: ${$.$row? "row": "column"};`}
  ${$ => `width: ${$.$w || '100%'};`}
  ${$ => `height: ${$.$h || '100%'};`}
  ${$ => `margin: ${$.$m || 'auto'};`}
  ${$ => `padding: ${$.$p || 'auto'};`}
`
