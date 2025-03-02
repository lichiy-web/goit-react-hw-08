import { Outlet } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import { useSelector } from 'react-redux';
import { selectLoading } from '../redux/contacts/selectors';
import Loader from './Loader/Loader';

const Layout = () => {
  const loading = useSelector(selectLoading);
  return (
    <>
      <AppBar />
      <Outlet />
      <Loader isLoading={loading} />
    </>
  );
};
export default Layout;
