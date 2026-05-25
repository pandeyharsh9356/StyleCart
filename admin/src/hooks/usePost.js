import { useState } from 'react';
import axiosInstance from '../api/axios';

const usePost = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const mutate = async (body, options = {}) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const finalUrl = options.url || url;
            const response = await axiosInstance.post(finalUrl, body);
            setSuccess(true);
            if (options.onSuccess) options.onSuccess(response.data);
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || 'Failed to post data';
            setError(errMsg);
            if (options.onError) options.onError(errMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error, success };
};

export default usePost;
