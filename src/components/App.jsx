import './App.css';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader/Loader';
import { selectError, selectLoading } from '../redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contactsOps';
import ErrorMessage from './ErrorMessage/ErrorMessage';

function App() {
  const loading = useSelector(selectLoading);
  // console.log('loading => ', loading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchContacts(abortController.signal));
    return () => abortController.abort();
  }, [dispatch]);

  return (
    <div className="main-container">
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <h1 className="phonebookTitle">Phonebook</h1>
          <ContactForm />
          <SearchBox />
          <ContactList />
          <Loader isLoading={loading} />
        </>
      )}
    </div>
  );
}

export default App;
