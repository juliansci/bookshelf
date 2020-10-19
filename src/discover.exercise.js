/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import './bootstrap'
import Tooltip from '@reach/tooltip'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Input, BookListUL, Spinner } from './components/lib'
import { BookRow } from './components/book-row'
import { client } from './utils/api-client'
import * as colors from './styles/colors'
import { useAsync } from 'utils/hooks'

function DiscoverBooksScreen() {
  const { data, error, run, isLoading, isError, isSuccess, setData, setError } = useAsync()
  const [query, setQuery] = useState('');
  const [queried, setQueried] = useState(false);

  useEffect(() => {
    if (queried) {
      run(client(`books?query=${encodeURIComponent(query)}`));
    }
  }, [queried, query, run, setData, setError]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <div
      css={{ maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0' }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{ width: '100%' }}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading && <Spinner />}
              {isError && <FaTimes aria-label="error" css={{ color: colors.danger }} />}
              {!isLoading && !isError && <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {data.books.map(book => (
              <li key={book.id}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
            <p>No books found. Try another search.</p>
          )
      ) : null}
      {
        isError ? (
          <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null
      }
    </div>
  )
}

export { DiscoverBooksScreen }
