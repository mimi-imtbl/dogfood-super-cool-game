import { config, passport as ImtblPassport } from "@imtbl/sdk";
import { useEffect, useState } from "react";

export type usePassportClientProps = {
  environment: config.Environment;
};

export const usePassportClient = ({ environment }: usePassportClientProps) => {
  // const clientId = "5lElL6IEz6mm1ZCBiURZ9FEVU93wEP5R"; // local
  // const redirectUri = "http://localhost:3000/login";
  // const logoutRedirectUri = "http://localhost:3000/logout";

  const clientId = "LkNkI01nqvJnSZ7bIRu2EFnvBAZhkfev"; // build
  const redirectUri =
    "https://65a08d3e967a8b5c4a51d03c--luminous-dodol-a000d6.netlify.app/login";
  const logoutRedirectUri =
    "https://65a08d3e967a8b5c4a51d03c--luminous-dodol-a000d6.netlify.app/logout";

  const [passport, setPassport] = useState<ImtblPassport.Passport | undefined>(
    undefined
  );

  useEffect(() => {
    const passport = new ImtblPassport.Passport({
      baseConfig: new config.ImmutableConfiguration({ environment }),
      clientId,
      redirectUri,
      logoutRedirectUri,
      audience: "platform_api",
      scope: "openid offline_access email transact",
    });

    setPassport(passport);
  }, [clientId, redirectUri, logoutRedirectUri, environment]);

  return {
    passport,
  };
};
