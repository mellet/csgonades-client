import { useEffect, useState } from "react";
import { AuthApi } from "../../api/TokenApi";

export const useSetupSession = (): void => {
  const [hasCalled, setHasCalled] = useState(false);

  useEffect(() => {
    if (!hasCalled) {
      AuthApi.setSessionCookie();
    }
    setHasCalled(true);
  }, [hasCalled]);
};
