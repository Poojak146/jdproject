import { useEffect } from "react";

const useAwayClick = ({ state, escFunction, mouseDownFunction }) => {
  useEffect(() => {
    document?.addEventListener("keydown", escFunction, false);
    document
      ?.querySelector(".activeoption")
      ?.addEventListener("mousedown", mouseDownFunction, false);
    return () => {
      document?.removeEventListener("keydown", escFunction, false);
      document
        ?.querySelector(".activeoption")
        ?.removeEventListener("mousedown", mouseDownFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
};

export default useAwayClick;
