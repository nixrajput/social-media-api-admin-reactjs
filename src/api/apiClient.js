async function apiClient(endpoint, method, { body, ...options } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    const config = {
        method: method || 'GET',
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        }
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    const baseUrl = process.env.API_URL || 'http://localhost:4000';

    let data;
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, config);
        data = await response.json();
        data.status = response.status;
        console.log('apiClientData', data);
        if (response.status === 200 || response.status === 200) return data;
        throw new Error(data.message);
    }
    catch (error) {
        console.log('apiClientError', error);
        return Promise.reject(error.message ? error.message : data.message);
    }
}

apiClient.get = function (endpoint, options) {
    return apiClient(endpoint, 'GET', { ...options });
}

apiClient.post = function (endpoint, body, options) {
    return apiClient(endpoint, 'POST', { body, ...options });
}

apiClient.put = function (endpoint, body, options) {
    return apiClient(endpoint, 'PUT', { body, ...options });
}

apiClient.delete = function (endpoint, options) {
    return apiClient(endpoint, 'DELETE', { ...options });
}

export default apiClient;