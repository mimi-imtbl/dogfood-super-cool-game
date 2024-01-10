import { useEffect } from 'react';
import { usePassportClient } from '../hooks/usePassportClient';
import { config } from '@imtbl/sdk';

export default function Login() {
  const environment = config.Environment.SANDBOX;
  const { passport } = usePassportClient({ environment });

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
