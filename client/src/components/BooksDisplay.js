import React from "react"
import axios from "axios"
import Jumbotron from "./Jumbotron"
import FormInput from "./FormInput"
import {Link} from "react-router-dom"

class BooksDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            title: "",
            author: "",
            synopsis: ""
        }
    }

    componentDidMount() {
        const accessString = localStorage.getItem('JWT');
        axios.get("/api/books",
        {headers: { Authorization: `JWT ${accessString}` }}).then(res => {
            this.setState({ books: res.data })
        })
    }

    onValueChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    onButtonSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/books", {
            title: this.state.title,
            author: this.state.author,
            synopsis: this.state.synopsis
        }).then(res => {
            let newBooks = this.state.books.concat([res.data])
            this.setState({books: newBooks, title:"", author: "", synopsis:""})
            
        })
    }

    deleteBook = (event) => {
        const id = event.target.id;
        console.log(id)
        axios.delete("/api/books/"+id).then(res => {
            axios.get("/api/books").then(res => {
                this.setState({ books: res.data })
            })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Jumbotron heading="Submit Books"/>
                        <div className="row">
                            <form>
                                <FormInput title="Title" name="title" value={this.state.title} onChange={this.onValueChange} />
                                <FormInput title="Author" name="author" value={this.state.author} onChange={this.onValueChange} />
                                <FormInput title="Synopsis" name="synopsis" value={this.state.synopsis} onChange={this.onValueChange} />
                                <button type="submit" onClick={this.onButtonSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Jumbotron heading="Books to read"/>
                        <div className="row">
                            <ul>
                                {this.state.books.map(book => {
                                    return <Link to="/edit"><li key={book._id}>{book.title} <button onClick={this.deleteBook} id={book._id}>X</button></li></Link>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default BooksDisplay