import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MoviesList.module.css';
import { fetchMoviesList } from './moviesListAPI';
import { selectMoviesList, updateManually } from './moviesListReducer';
import { useQuery } from './moviesListUtils';

export function MoviesList() {
  const movies = useSelector(selectMoviesList);
  const dispatch = useDispatch();
  const [init, setInit] = useState(true);
  const query = useQuery();
  const [title, setTitle] = useState(query.get('title') || '');
  const [page, setPage] = useState(45);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (!!title && title.trim() !== '' && init) onFetch();
    if (!!movies?.Search) setData(movies.Search);
    setInit(false);
  }, [movies]);

  const changeSearch = (event) => {
    setTitle(event.target.value);
  }

  const keyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await onFetch();
    }
  }

  const onFetch = async () => {
    window.history.replaceState(null, "New Title", `?title=${title}`)
    try {
      const data = await fetchMoviesList(title, page);
      if (!data.data.Error) {
        dispatch(updateManually(data.data));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await onFetch();
  }

  console.log('CHECK MOVIES', movies)

  return (
    <div className={`${styles.container}`}>
      <div>
        <form>
          <input type="text" value={title} onChange={changeSearch} onKeyPress={keyDown} />
          <input type="submit" value="Search" onClick={onSubmit} />
        </form>
      </div>

      {data?.length > 0 &&
        data?.map((elem) =>
          <div className={`${styles.body}`}>

          </div>
        )
      }
    </div>
  );
}
