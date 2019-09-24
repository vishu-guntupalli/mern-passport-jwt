import React from "react"

class EditBook extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            author: "",
            synopsis: ""
        }
    }

    render() {
        return (
            <div>
                Title: <textarea name="title" value={this.state.title} /><br/>
                Author: <textarea name="author" value={this.state.author} /><br />
                Synopsis: <textarea name="synopsis" value={this.state.synopsis} /><br />
            </div>
        )
    }
}

export default EditBook