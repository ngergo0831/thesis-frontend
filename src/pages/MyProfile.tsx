import { PermIdentity, Email, Key, Https } from '@mui/icons-material';
import { FormControl, InputLabel, Input, InputAdornment, Button, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { changePassword } from '../api/api';
import { Avatar } from '../components/Avatar/Avatar';
import { BoxContainer } from '../GlobalStyles';
import { currentPageState } from '../store/atoms/pageAtoms';
import { currentUserState } from '../store/atoms/userAtoms';

export const MyProfile = () => {
  const setPage = useSetRecoilState(currentPageState);
  const currentUser = useRecoilValue(currentUserState);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    setPage('My Profile');
  }, []);

  const handleSave = async () => {
    if (newPassword !== confirmPassword || newPassword === '') {
      setError(true);
      setSuccess(false);
      setAuthError(false);
      return;
    }
    if (newPassword === '') {
      setError(false);
      setSuccess(false);
      setAuthError(true);
      return;
    }

    try {
      await changePassword(password, newPassword);
      setError(false);
      setSuccess(true);
      setAuthError(false);
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (_error) {
      setError(false);
      setSuccess(false);
      setAuthError(true);
    }
  };

  return (
    <div
      style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <BoxContainer style={{ width: 'fit-content', gap: '2rem' }}>
        <h1>Personal information</h1>
        <Avatar userName="John Doe" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-first-name">First name</InputLabel>
            <Input
              id="input-with-icon-first-name"
              startAdornment={
                <InputAdornment position="start">
                  <PermIdentity />
                </InputAdornment>
              }
              value={currentUser.firstName}
              disabled
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-last-name">Last name</InputLabel>
            <Input
              id="input-with-icon-last-name"
              startAdornment={
                <InputAdornment position="start">
                  <PermIdentity />
                </InputAdornment>
              }
              value={currentUser.lastName}
              disabled
            />
          </FormControl>
        </div>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="input-with-icon-email">Email</InputLabel>
          <Input
            id="input-with-icon-email"
            startAdornment={
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            }
            value={currentUser.email}
            disabled
          />
        </FormControl>
        <h2>Change password</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="input-with-icon-old-password">Old password</InputLabel>
            <Input
              id="input-with-icon-old-password"
              startAdornment={
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              }
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="input-with-icon-new-password">New password</InputLabel>
            <Input
              id="input-with-icon-new-password"
              startAdornment={
                <InputAdornment position="start">
                  <Https />
                </InputAdornment>
              }
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="input-with-icon-confirm-password">Confirm new password</InputLabel>
            <Input
              id="input-with-icon-confirm-password"
              startAdornment={
                <InputAdornment position="start">
                  <Https />
                </InputAdornment>
              }
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </FormControl>
        </div>
        {authError && (
          <Alert severity="error" style={{ width: '100%' }}>
            Your password is incorrect!
          </Alert>
        )}
        {error && (
          <Alert severity="error" style={{ width: '100%' }}>
            Passwords do not match. - Please check again!
          </Alert>
        )}
        {success && (
          <Alert severity="success" style={{ width: '100%' }}>
            Password successfully changed!
          </Alert>
        )}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </BoxContainer>
    </div>
  );
};
