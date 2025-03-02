import { useDispatch, useSelector } from 'react-redux';
import css from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/slectors';
import { logOut } from '../../redux/auth/operations';

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={css.userMenuWrapper}>
      <p className={css.welcomeUser}>Welcome, {user.name}!</p>
      <button className={css.logoutBtn} onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
};
export default UserMenu;
