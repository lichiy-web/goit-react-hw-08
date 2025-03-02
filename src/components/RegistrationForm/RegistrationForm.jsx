import { Formik } from 'formik';
import css from './RegistrationForm.module.css';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const registrationFormSchema = Yup.object().shape({
  name: Yup.string(),
});

const RegistrationForm = () => {
  return (
    <Formik
      intialValues={initialValues}
      validationSchema={registrationFormSchema}
    ></Formik>
  );
};
export default RegistrationForm;
