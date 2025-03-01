import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';

const initialValues = {
  name: '',
  number: '',
  id: '',
};

const phoneNumberMask =
  /^(\d(?=-?\(?(\d-?){3}\)?(-?\d){7}))?((?<=^\d)-)?((\((?=(\d-?){3}\)))?(\d-?){3}((?<=\((\d-?){3})\))?)?((?<=[\d|)])-)?(\d-?){6}\d$/i;

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(phoneNumberMask, 'Must be a valid phone number!')
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(selectContacts);
  const onAddContact = newContact => {
    newContact.number = newContact.number.match(/\d/gi).join('');

    const isExisted = contactList.some(
      ({ number }) => number.match(/\d/gi).join('') === newContact.number
    );
    if (isExisted) {
      toast.error('The contact containing this number already exists!', {
        duration: 4000,
      });
      return;
    }
    dispatch(addContact(newContact));
    toast.success('The new contact has successfully added!', {
      duration: 4000,
    });
  };

  const handleSubmit = (newContact, options) => {
    onAddContact(newContact);
    options.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.contactForm}>
        <label className={clsx(css.formItem, css.nameLabel)}>
          <span className={css.inputLabel}>Name</span>
          <Field className={css.inputItem} type="text" name="name" />
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
        </label>
        <label className={clsx(css.formItem, css.numberLabel)}>
          <span className={css.inputLabel}>Number</span>
          <Field className={css.inputItem} type="text" name="number" />
          <ErrorMessage
            className={css.errorMessage}
            name="number"
            component="span"
          />
        </label>
        <button className={clsx(css.formItem, css.btn)} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
