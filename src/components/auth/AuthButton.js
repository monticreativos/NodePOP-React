import { Link } from 'react-router-dom';
import Button from '../common/Button';

import { logout } from '../auth/service';
import { useAuth } from './context';

import Swal from 'sweetalert2'


function AuthButton({ className }) {
  const { isLogged, handleLogout: onLogout } = useAuth();

  const handleLogoutClick = async () => {

    Swal.fire({
      title: 'Are you sure you want to go out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await logout();
    onLogout();
      }
    })
    
  };

  return isLogged ? (
    <Button className={className} onClick={handleLogoutClick}>
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" variant="primary" className={className}>
      Login
    </Button>
  );
}

export default AuthButton;
