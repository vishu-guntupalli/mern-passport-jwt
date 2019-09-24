import React from "react"

const Jumbotron = (props) => {
    return (
        <div className="row">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">{props.heading}</h1>
                </div>
            </div>
        </div>
        )
}

export default Jumbotron