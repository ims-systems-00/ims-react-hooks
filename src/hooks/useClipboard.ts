import React from "react";
type ClipboardRef = HTMLElement | null;
export interface ClipboardControllers {
  contentElementReference: ClipboardRef;
  copySuccess: boolean;
  copyFormatedToClipboard: Function;
  copyPlainTextToClipboard: Function;
}

const SUCCESS_TIMEOUT = 2500;
function useClipboard(): ClipboardControllers {
  const [copySuccess, setCopySuccess] = React.useState<boolean>(false);
  const contentElementReference = React.useRef<ClipboardRef>(null);
  async function copyFormatedToClipboard() {
    if (contentElementReference && contentElementReference.current) {
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
        } catch (err) {
          console.log("Error copying to clipboard.");
          console.log(err);
        }
        setTimeout(() => setCopySuccess(false), SUCCESS_TIMEOUT);
      }
    }
  }
  async function copyPlainTextToClipboard(value: string) {
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
    copyPlainTextToClipboard,
  };
}

export default useClipboard;
