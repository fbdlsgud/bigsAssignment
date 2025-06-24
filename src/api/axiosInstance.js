import axios from 'axios';


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers: {
    //     'Content-Type' : 'application/json',
    // },
})


instance.interceptors.request.use((config)=>{

    if(config.url.includes("/auth/signin") || config.url.includes("/auth/signup")) {

        return config;
    }

    const token = localStorage.getItem("accessToken");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
        
    }
    return config;

});



instance.interceptors.response.use(
    // 응답 성공
    (res) => {
        return res;
    },
    async (err) => {
        const original = err.config;
        const msg = err?.response?.data?.message;
        const status = err?.response?.status;

        if(original.url.includes("/auth/refresh")) {
                alert("세션이 만료되었습니다, 다시 로그인 해주세요.");
                localStorage.clear();
                window.location.href="/signin";
                
                return Promise.reject(err);
        }

      
        // accessToken 재발급
        if( status === 401 && !original._retry) {
            original._retry = true;
            try{
              const refreshToken = localStorage.getItem("refreshToken");
            const res = await instance.post('/auth/refresh', {refreshToken});

            const newAccessToken = res.data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken",res.data.refreshToken);

            original.headers.Authorization = `Bearer ${newAccessToken}`;
            
            return instance(original);
            }
            catch (err) {
                localStorage.clear();
                window.location.href="/signin";
                
                return Promise.reject(err);
            }
        }

        if(status === 401 && msg) {
            alert(msg);
            return Promise.reject(err);
        }

            return Promise.reject(err);
    }
)



export default instance;