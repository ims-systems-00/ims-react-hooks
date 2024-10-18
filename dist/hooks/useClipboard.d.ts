import React from "react";
type ClipboardRef = React.MutableRefObject<HTMLElement | null>;
export interface ClipboardControllers {
    contentElementReference: ClipboardRef;
    copySuccess: boolean;
    copyFormatedToClipboard: () => void;
    copyPlainTextToClipboard: (value: string) => void;
}
declare function useClipboard(): ClipboardControllers;
export default useClipboard;
