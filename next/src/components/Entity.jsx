import styled from 'styled-components'

const StyledEntity = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

// TODO: Share styled component with Tile
const StyledEntityTexture = styled.div`
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none; /* Hover grid entities, not 96x96 child */
  background: url(${({ $tileset }) => $tileset});
  background-position: -${({ $texturePos }) => $texturePos.x}px ${({ $texturePos }) => $texturePos.y}px;
  background-repeat: no-repeat;
  background-size: 1000% 100%;
  image-rendering: pixelated;
  position: relative;
  top: -32px;
  left: -32px;
  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);
`

export const Entity = ({ tileset, texturePos }) => {
  return <StyledEntity>{texturePos && <StyledEntityTexture $tileset={tileset} $texturePos={texturePos} />}</StyledEntity>
}
