import React from "react";

function useProcessing(initializers) {
  let initState = {};
  initializers.forEach((process) => {
    initState[process.action] = { status: process.status, id: null };
  });
  let [processing, setProcessing] = React.useState(initState);
  let dispatch = (state) => {
    setProcessing((currentProcesses) => {
      let key = Object.keys(state)[0];
      let value = Object.values(state)[0];
      let updatedProcesses = { ...currentProcesses };
      updatedProcesses[key] = value;
      return updatedProcesses;
    });
  };
  return {
    processing,
    dispatch,
  };
}

export default useProcessing;
