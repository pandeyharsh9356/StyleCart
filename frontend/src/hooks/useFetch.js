import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { serverUrl } = useContext(authDataContext);

    const fetchData = useCallback(async () => {
        if (!url || !serverUrl) {
            setError('Missing API url or server URL');
            setLoading(false);
            return;
        }
        const method = options.method || 'get';
        console.debug(`[useFetch] ${method.toUpperCase()} ${serverUrl}${url}`);
        setLoading(true);
        try {
            const response = await axios({
                url: serverUrl + url,
                method,
                data: options.body,
                withCredentials: true
            });
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [url, serverUrl, JSON.stringify(options)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
