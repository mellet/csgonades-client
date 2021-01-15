import { useEffect, useState } from "react";
import { AuthApi } from "../authentication/AuthApi";

export const useSetupSession = (): void => {
  const [hasCalled, setHasCalled] = useState(false);

  useEffect(() => {
    if (!hasCalled) {
      AuthApi.setSessionCookie();
    }
    setHasCalled(true);
  }, [hasCalled]);
};
