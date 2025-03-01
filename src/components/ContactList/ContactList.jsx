import css from './ContactList.module.css';
import Contact from '../Contact/Contact.jsx';
import { useSelector } from 'react-redux';
import Notification from '../Notification/Notification.jsx';
import {
  selectContacts,
  selectFilteredContacts,
} from '../../redux/contactsSlice.js';

const ContactList = () => {
  const contactList = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);

  if (!contactList?.length) return <Notification />;
  return (
    <div className={css.contactList}>
      {filteredContacts.map(contact => {
        return <Contact key={contact.id} {...contact} />;
      })}
    </div>
  );
};
export default ContactList;
