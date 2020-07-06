import React from 'react'
import styled from 'styled-components'

const tiles = [
  require('../assets/tile1.png'),
  require('../assets/tile2.png'),
  require('../assets/tile3.png'),
]

const StyledTile = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(${({ color }) => color}, 0.8);
  border: 4px solid;
  border-bottom-color: rgba(${({ color }) => color}, 0.1);
  border-right-color: rgba(${({ color }) => color}, 1);
  border-top-color: rgba(${({ color }) => color}, 1);
  border-left-color: rgba(${({ color }) => color}, 0.3);
`

export const Tile = () => {
  return <StyledTile color={'109,230,121'} />
}
