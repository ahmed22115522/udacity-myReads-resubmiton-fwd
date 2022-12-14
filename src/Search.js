import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as BookAPI from './BooksAPI'
import PropTypes from 'prop-types'

const Search = ({onUpdateShelf, books}) => {

  const [searchedBooks, setSearchedBooks] = useState([])

  const getSearchData = async (e) => {
    let query = e.target.value

    const res = await BookAPI.search(query)

    // If the search input is empty the code will not run as the res will be undefind

    if(query){
      setSearchedBooks(res)
    }else{
      setSearchedBooks([])
    }

  }

  const matchedSearchedBooks = searchedBooks.length > 0 
  ? searchedBooks.map(book => 
      books.find(bookFound => bookFound.id === book.id) 
        ? books.find(bookFound => bookFound.id === book.id) 
        : {...book , shelf: 'none'} 
  ): [] ;

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title, author, or ISBN" onChange={(e) => getSearchData(e)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {
              matchedSearchedBooks.length <= 0 ? <p>No Books Found</p> : 
              matchedSearchedBooks.map((searched, index) => 
                <li key={index}>
                  
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 192,
                          backgroundImage:
                            `url("${searched.imageLinks?.thumbnail}")`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select onChange={(e) => onUpdateShelf(e,searched.id)} value={searched.shelf}>
                          <option value="moveTo" disabled>
                            Move to...
                          </option>
                          <option value='currentlyReading'>
                              Currently Reading
                          </option>
                          <option value='wantToRead'>
                              Want to Read
                          </option>
                          <option value='read'>
                              Read
                          </option>
                          <option value="none">
                            None
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{searched.title}</div>
                    <div className="book-authors">{searched.authors && searched.authors[0]}</div>
                  </div>
                </li>
      )}
            





          </ol>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  onUpdateShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default Search;
