export default axios => {
    axios.interceptors.request.use(
        config => {
            console.log(config);
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    axios.interceptors.response.use(
        response => {
            console.log(response);
            return response;
        },
        error => {
            return Promise.reject(error);
        }
    )
}