import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { ImSearch } from 'react-icons/im';
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectNameFilter);
  const onSearch = e => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={css.SearchBox}>
      <label className={css.searchLabelWrapper}>
        <span className={css.searchLabel}>Find contacts by name</span>
        <div className={css.searchInputItem} tabIndex="1">
          <div className={css.searchIcon}>
            <ImSearch />
          </div>
          <input
            className={css.searchInputField}
            type="text"
            value={searchQuery}
            onChange={onSearch}
          />
        </div>
      </label>
    </div>
  );
};
export default SearchBox;
