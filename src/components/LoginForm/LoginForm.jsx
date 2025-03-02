import css from './LoginForm.module.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import YupPassword from 'yup-password';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
// import { register } from '../../redux/auth/operations';
// YupPassword(Yup);

const initialValues = {
  email: '',
  password: '',
};

const registrationFormSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (credentials, options) => {
    // console.log(credentials);
    dispatch(logIn(credentials));
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
          <span className={css.inputLabel}>Email</span>
          <Field
            className={css.inputItem}
            type="text"
            name="email"
            autoComplete="current-email"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="email"
            component="span"
          />
        </label>
        <label className={css.authItem}>
          <span className={css.inputLabel}>Name</span>
          <Field
            className={css.inputItem}
            type="password"
            name="password"
            autoComplete="current-password"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
        </label>
        <button className={css.submitBtn} type="submit">
          LogIn
        </button>
      </Form>
    </Formik>
  );
};
export default LoginForm;
