import React, { Component } from "react";
import {Link} from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import axios from "axios";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import {Redirect} from "react-router-dom"

class Books extends Component {
  // Setting our component's initial state
  constructor(props){
    super(props)
    let logIn = false;
    if(this.props.location.state && this.props.location.state.loggedIn){
      logIn = true;
    }
    this.state = {
      books: [],
      title: "",
      author: "",
      synopsis: "",
      loggedIn: logIn
    };
  }
  

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    const accessString = localStorage.getItem('JWT');
    axios.get("/api/books",{headers: { Authorization: `JWT ${accessString}` }})
      .then(res =>
        this.setState({ loggedIn: true, books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    const accessString = localStorage.getItem('JWT');
    axios.delete("/api/books/" + id,{headers: { Authorization: `JWT ${accessString}` }})
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    const accessString = localStorage.getItem('JWT');
    if (this.state.title && this.state.author) {
      axios.post("/api/books", {
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      },{headers: { Authorization: `JWT ${accessString}` }})
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  logout = () =>{
    this.setState({loggedIn:false})
    localStorage.clear('JWT')
  }

  render() {
    if(this.state.loggedIn){
    return (
      <Container fluid>
        <Row>
          <Col size="md-11"></Col>
          <Col size="md-1">
            <a href="/" onClick={this.logout}>logout</a>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
              <h1>What Books Should I Read?</h1>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
              <h1>Books On My List</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
    }
    else{
    return <Redirect to="/" />
    }
  }
}

export default Books;
