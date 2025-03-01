import css from './Notification.module.css';

const Notification = () => {
  return (
    <div className={css.notification}>
      There are no contacts in the phonebook. <br />
      Please add the first one using form above!
    </div>
  );
};

export default Notification;
