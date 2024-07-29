import React from "react";

const useDualStateController = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return {
    isOpen,
    toggle,
  };
};

export default useDualStateController;
