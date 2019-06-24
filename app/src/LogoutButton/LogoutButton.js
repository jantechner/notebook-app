import React from 'react'
import { Link } from 'react-router-dom'

function LogoutButton(props) {
    return (
        <div className="row">
            <div className="col">
                <Link to='/'>
                    <div id='logout-button' className="btn btn-light w-100" >
                        Logout
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default LogoutButton