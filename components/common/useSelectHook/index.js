import { useEffect, useState } from "react";
import useAwayClick from "../useAwayClick";

const useSelectHook = ({ formik, radioChecked, handleRadioButtonClick }) => {
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const handleSelectBoxClick = () => {
    handleRadioButtonClick?.();
    setShowSelectMenu((c) => !c);
  };

  const escFunction = (event) => {
    if (event.keyCode === 27 && showSelectMenu) {
      setShowSelectMenu(false);
    }
  };

  const mouseDownFunction = (e) => {
    const isScrollClick =
      e.offsetX > e.target.clientWidth || e.offsetY > e.target.clientHeight;
    if (showSelectMenu && !isScrollClick) {
      setShowSelectMenu(false);
    }
  };

  useEffect(() => {
    if (!radioChecked) {
      setShowSelectMenu(false);
      formik.resetForm();
    }
  }, [radioChecked]);

  useAwayClick({ state: showSelectMenu, escFunction, mouseDownFunction });

  return { showSelectMenu, handleSelectBoxClick };
};

export default useSelectHook;
