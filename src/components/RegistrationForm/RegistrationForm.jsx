import css from './RegistrationForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
YupPassword(Yup);

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const registrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().password().required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (credentials, options) => {
    console.log(credentials);
    dispatch(register(credentials));
    options.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.authForm}>
        <label className={css.authItem}>
          <span className={css.inputLabel}>Name</span>
          <Field className={css.inputItem} type="text" name="name" />
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
        </label>
        <label className={css.authItem}>
          <span className={css.inputLabel}>Email</span>
          <Field
            className={css.inputItem}
            type="text"
            name="email"
            autoComplete="new-email"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="email"
            component="span"
          />
        </label>
        <label className={css.authItem}>
          <span className={css.inputLabel}>Password</span>
          <Field
            className={css.inputItem}
            type="password"
            name="password"
            autoComplete="new-password"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
        </label>
        <button className={css.submitBtn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
