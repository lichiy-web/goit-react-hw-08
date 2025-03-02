import { useSelector } from 'react-redux';
import { selectError, selectLoading } from '../redux/contacts/selectors';
import SearchBox from '../components/SearchBox/SearchBox';
import ContactList from '../components/ContactList/ContactList';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ContactForm from '../components/ContactForm/ContactForm';

const ContactsPage = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  return (
    <>
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
    </>
  );
};
export default ContactsPage;
