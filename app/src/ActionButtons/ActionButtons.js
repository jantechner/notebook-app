import React from 'react'
import { Link } from 'react-router-dom'

function ActionButtons(props) {
    return (
        <div className="row">
            <div className="col-4">
                <Link to={`${props.match.url}/new`}>
                    <div className="btn btn-info w-100"> Add new </div>
                </Link>
            </div>
            <div className="col-4">
                <Link to={`${props.match.url}/edit`}>
                    <div className="btn btn-warning w-100"> Edit </div>
                </Link>
            </div>
            <div className="col-4">
                <button className="btn btn-danger w-100" onClick={props.delete}> Delete </button>
            </div>
        </div>
    )
}

export default ActionButtons