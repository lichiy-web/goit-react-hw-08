import { useDispatch } from 'react-redux';
import SearchBox from '../components/SearchBox/SearchBox';
import ContactList from '../components/ContactList/ContactList';
import ContactForm from '../components/ContactForm/ContactForm';
import { fetchContacts } from '../redux/contacts/operations';
import { useEffect } from 'react';

const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchContacts(abortController.signal));
    return () => abortController.abort();
  }, [dispatch]);
  return (
    <>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </>
  );
};
export default ContactsPage;
