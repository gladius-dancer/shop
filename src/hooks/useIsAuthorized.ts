import { useMemo } from "react";
import { useAppSelector } from "./useRedux";

export function useIsAuthorized() {
  const user = useAppSelector(state=>state.authReducer.authStatus);

  return useMemo(()=> {
    return user != false
  }, [user])
}

