import {NavLink, useLocation} from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'

const NotePage = () => {

    const {state} = useLocation()
    
    console.log(state)

    return (
        <div className="main-part">
            <Row>
                <div className='d-flex gap-2'>
                    <NavLink className="navlink" to={"/all"}><ArrowLeft size={40} color='#3884AE'/></NavLink>
                    <h1 className="margin-h1">{state.title}</h1>
                </div>
            </Row>
        </div>
    )

}
export default NotePage;