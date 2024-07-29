import React from "react";
const SUCCESS_TIMEOUT = 2500;
const useClipboard = () => {
  const [copySuccess, setCopySuccess] = React.useState(false);
  const contentElementReference = React.useRef(null);
  async function copyFormatedToClipboard() {
    if (contentElementReference.current) {
      /** create a range to select contents that will be copied. */
      // const range = document.createRange();
      // range.selectNodeContents(contentElementReference.current);
      /** copy the contents to clipboard. */
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "text/html": new Blob(
                [contentElementReference.current.innerHTML],
                {
                  type: "text/html",
                }
              ),
            }),
          ]);
          setCopySuccess(true);
          console.log("Contentns copied.");
        } catch (err) {
          console.log("Error copying to clipboard.");
          console.log(err);
        }
        setTimeout(() => setCopySuccess(false), SUCCESS_TIMEOUT);
      }
    }
  }
  async function copyPlainTextToClipBoard(value, cb = () => {}) {
    if (navigator.clipboard) {
      setCopySuccess(true);
      await navigator.clipboard.writeText(value);
      setTimeout(() => setCopySuccess(false), SUCCESS_TIMEOUT);
    }
  }
  return {
    contentElementReference,
    copySuccess,
    copyFormatedToClipboard,
    copyPlainTextToClipBoard,
  };
};

export default useClipboard;
