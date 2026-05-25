import { useState } from 'react';
import axiosInstance from '../api/axios';

const useDelete = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const remove = async (id, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const finalUrl = id ? `${url}/${id}` : url;
            const response = await axiosInstance.delete(finalUrl);
            if (options.onSuccess) options.onSuccess(response.data);
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || 'Failed to delete data';
            setError(errMsg);
            if (options.onError) options.onError(errMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error };
};

export default useDelete;
