import clsx from 'clsx';
import css from './Contact.module.css';
import { FaPhone } from 'react-icons/fa6';
import { RiUser3Fill } from 'react-icons/ri';
import { normalizePhoneNumber } from './Contact.js';
// import { deleteContact } from '../../redux/contactsSlice.js';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps.js';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
    toast.success('The contact has successfully deleted!', {
      duration: 4000,
    });
  };
  return (
    <div className={css.contactItem} tabIndex="1">
      <div className={css.contactInfo}>
        <div className={clsx(css.infoItem, css.contactNameItem)}>
          <div className={css.contactNameIcon}>
            <RiUser3Fill />
          </div>

          <span className={css.contactName}>{name}</span>
        </div>
        <div className={clsx(css.infoItem, css.contactNumberItem)}>
          <FaPhone className={css.contactPhoneIcon} />
          <span className={css.contactNumber}>
            {normalizePhoneNumber(number)}
          </span>
        </div>
      </div>
      <div className={css.contactBtnItem}>
        <button className={css.btn} onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default Contact;
