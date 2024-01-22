import { useState } from 'react';

const useDialog = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);

    const closeDialog = () => {
        setDialogOpen(false);
        setDialogLoading(false);
    };

    const openDialog = () => setDialogOpen(true);

    return [dialogOpen, dialogLoading, setDialogLoading, openDialog, closeDialog];
};

export default useDialog;