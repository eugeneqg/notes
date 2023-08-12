import {NavLink, useLocation} from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import "./note-page.sass";

const NotePage = () => {

    const {state} = useLocation();
    const navigate = useNavigate()
    
    console.log(state)

    return (
        <div className="main-part">
            <Row>
                <div className=''>
                    <div className='note-title d-flex gap-2'>
                        <ArrowLeft onClick={() => navigate(-1)} size={40} color='#3884AE'/>
                        <h1 className="note-title margin-h1">{state.title}</h1>
                    </div>
                    <div className='note-text'>
                        <p>{state.text}</p>
                    </div>
                </div>
            </Row>
        </div>
    )

}
export default NotePage;