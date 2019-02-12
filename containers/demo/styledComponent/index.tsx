import styled from 'styled-components'
import { get } from '../../common/utils/fetch'

const Title = styled.h1`
  background: red;
  font-size: 50px;
  width: 10rem;
  overflow: hidden;
  p {
    color: wheat;
  }
`
export default () => {
  const test = () => {
    get('/api/test/a').then(re => console.log(re))
  }
  return (
    <Title>
      demo with styled-component
      <p data-ilog="sdsa.dsad.ds" onClick={test}>green font</p>
    </Title>
  )
}
