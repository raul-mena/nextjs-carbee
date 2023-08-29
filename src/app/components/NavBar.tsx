import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuthContext } from '../context/auth.context';
import Link from 'next/link';

export default function NavBar() {
  const { successLogout } = useAuthContext()

  const logout = () => {
    // clean session
    successLogout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Carbee
          </Typography>
          <Link href={'/login'}>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
