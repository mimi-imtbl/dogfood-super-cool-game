import { useEffect } from 'react';
import { usePassportClient } from '../hooks/usePassportClient';
import { config } from '@imtbl/sdk';

export default function Login() {
  const { passport } = usePassportClient({
    environment: config.Environment.SANDBOX,
  });

  useEffect(() => {
    if (!passport) return;
    try {
      passport.loginCallback();
    } catch (error) {
      console.warn('login callback error', error);
    }
  }, [passport]);

  return <></>;
}
