import styled from 'styled-components'
import { animated } from 'react-spring'

export interface Theme {
  <Props>(props: Props): null | JSX.Element
  Text: <Props>(props: Props) => null | JSX.Element
  Title: <Props>(props: Props) => null | JSX.Element
  Flex: <Props>(props: Props & FlexProps) => null | JSX.Element
}

export const Theme = (props: any) => {
  return props.children
}

Theme.Title = styled(animated.h1)`
  font-size: 8rem;
  width: 100%;
`

Theme.Text = styled(animated.div)`
  font-size: 2rem;
  width: 100%;
`

export type FlexProps = Partial<{
  $wrap: boolean
  $row: boolean
  $end: boolean
  $start: boolean
  $gap: string
}>

Theme.Flex = styled.div<FlexProps>`
  display: flex;
  width: 100%;
  height: 100%;
  margin: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  ${({$row}) => `flex-direction: ${$row? "row": "column"};`}
  ${({$wrap}) => $wrap && `flex-wrap: wrap;`}
  ${({$gap}) => $gap && `gap: ${$gap}`}
`
