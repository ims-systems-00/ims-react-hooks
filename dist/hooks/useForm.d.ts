declare function useForm(initdataModel: any, schema: any): {
    dataModel: any;
    validationErrors: {};
    isBusy: boolean;
    handleChange: ({ field, value }: {
        field: any;
        value: any;
    }) => void;
    handleSubmit: (e: any, doSubmit: any, reset?: boolean, options?: {}) => Promise<void>;
    initiateDataModel: (dataModel: any) => void;
    isFormValid: () => boolean;
    resetForm: () => void;
    hasUnsavedData: () => boolean;
};
export default useForm;
