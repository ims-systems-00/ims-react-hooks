import React from "react";

function useDualStateController(): {
  isOpen: boolean;
  toggle: Function;
} {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return {
    isOpen,
    toggle,
  };
}

export default useDualStateController;
