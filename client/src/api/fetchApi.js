export const fetchApi = async (endPoint, {body, ...customConfig} = {}) => {

    const headers = {'Content-Type': 'application/json'}

    let config = {
        method: body ? 'POST' : 'GET',
        mode: 'cors',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    }

    if(body){
        config.body = JSON.stringify(body)
    }    
    
    let data;

    try{
        const response = await fetch(endPoint, config)
        data = response.json();

        if (response.ok) {
            // Return a result object similar to Axios
            return {
              status: response.status,
              data,
              headers: response.headers,
              url: response.url,
            }
        }
          throw new Error(response.statusText)
    }catch(error){
        
        return Promise.reject(error)
    }


}

    fetchApi.get = (endPoint, customConfig = {}) => {
        return fetchApi(endPoint, {...customConfig, method: 'GET' })
    }

    fetchApi.post = (endPoint, body, customConfig = {}) => {
        return fetchApi(endPoint, {body, ...customConfig})
    }
    fetchApi.delete = (endPoint, body, customConfig = {}) => {
        return fetchApi(endPoint, {body, ...customConfig, method: 'DELETE'})
    }