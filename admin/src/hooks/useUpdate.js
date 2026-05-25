import { useState } from 'react';
import axiosInstance from '../api/axios';

const useUpdate = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const update = async (id, body, options = {}) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const finalUrl = id ? `${url}/${id}` : url;
            const response = await axiosInstance.put(finalUrl, body);
            setSuccess(true);
            if (options.onSuccess) options.onSuccess(response.data);
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || 'Failed to update data';
            setError(errMsg);
            if (options.onError) options.onError(errMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { update, loading, error, success };
};

export default useUpdate;
