import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../redux/contacts/selectors';
import SearchBox from '../components/SearchBox/SearchBox';
import ContactList from '../components/ContactList/ContactList';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ContactForm from '../components/ContactForm/ContactForm';
import { fetchContacts } from '../redux/contacts/operations';
import { useEffect } from 'react';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchContacts(abortController.signal));
    return () => abortController.abort();
  }, [dispatch]);
  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <ContactForm />
          <SearchBox />
          <ContactList />
          <Loader isLoading={loading} />
        </>
      )}
    </>
  );
};
export default ContactsPage;
