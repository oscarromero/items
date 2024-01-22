import { useState } from 'react';

const useNotification = () => {
    const [notification, setNotification] = useState({
        open: false,
        severity: 'success',
        message: ''
    });

    const openNotification = (options) => setNotification({ ...notification, ...options, open: true });
    const closeNotification = () => setNotification({ ...notification, open: false });
    const successNotification = (message) => openNotification({ severity: 'success', message });
    const errorNotification = (message) => openNotification({ severity: 'error', message });

    return [notification, closeNotification, successNotification, errorNotification];
};

export default useNotification;
