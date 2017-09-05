import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

const BookShelfChanger = props => (
    <div className="book-shelf-changer">
      <select>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
);

const AuthorList = props => (
    <div className="book-authors">
      {props.authors.map((author) => (
          <p key={author}>{author}</p>
        )
      )}
    </div>
);

const BookList = props => (
    <ol className="books-grid">
      {props.books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188,
                  backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                <BookShelfChanger/>
              </div>
              <div className="book-title">{book.title}</div>
              <AuthorList authors={book.authors}/>
            </div>
          </li>
        ))}
    </ol>
);

const BookShelf = props => (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <BookList books={props.books}/>
      </div>
    </div>
);

class SearchBooks extends Component {
  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  };

  render() {
    const { query } = this.state;

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
          />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
    );
  }
}

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                      books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                      shelfTitle="Currently Reading"
                  />
                  <BookShelf
                      books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                      shelfTitle="Want To Read"
                  />
                  <BookShelf
                      books={this.state.books.filter((book) => book.shelf === "read")}
                      shelfTitle="Read"
                  />
                  <BookShelf
                      books={this.state.books.filter((book) => book.shelf === "none" || book.shelf === "")}
                      shelfTitle="None"
                  />
                </div>
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                  className="search-books">
                  Add a book</Link>
              </div>
            </div>
        )}/>
        <Route path="/search" render={() => (
            <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
