import styled from 'styled-components'
import {Link} from 'containers/routes'

// You must use the <Link> component
// so client-side transitions between routes can be enabled

const Container = styled.div`
  font-size: 0.4267rem;
  padding: 0 40px;
`
export default function Index() {
  return (
    <Container>
      <p>
        Welcome to next.js!
      </p>
      <p>
        <Link to="mallDetail" params={{id: '111'}}><a>🔗to detail with params props</a></Link>
      </p>
      <hr/>
      <p>
        <Link to="/mall/detail/111"><a>🔗to detail directly.</a></Link>
      </p>
    </Container>
  )
}
