import { config, passport as ImtblPassport } from '@imtbl/sdk';
import { useEffect, useState } from 'react';

export type usePassportClientProps = {
  environment: config.Environment;
};

export const usePassportClient = ({ environment }: usePassportClientProps) => {
  const clientId = 'sandbox';
  const redirectUri = 'https://localhost:3000/redirect';
  const logoutRedirectUri = 'https://localhost:3000/logout';

  const [passport, setPassport] = useState<ImtblPassport.Passport | undefined>(
    undefined
  );

  useEffect(() => {
    const passport = new ImtblPassport.Passport({
      baseConfig: new config.ImmutableConfiguration({ environment }),
      clientId,
      redirectUri,
      logoutRedirectUri,
      audience: 'platform_api',
      scope: 'openid offline_access email transact',
    });

    setPassport(passport);
  }, [clientId, redirectUri, logoutRedirectUri, environment]);

  return {
    passport,
  };
};
