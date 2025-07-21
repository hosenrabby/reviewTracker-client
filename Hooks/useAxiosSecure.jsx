import axios from 'axios';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../src/Context/AuthContext';
import { toast } from 'react-toastify';

const useAxiosSecure = () => {
    const { user, signout } = useContext(AuthContext);
    const errorNotify = () =>
        toast.error('Unauthorized or Forbiden access logout status 401/403', {
            theme: "colored",
        });
    const axiosInstance = useMemo(() => {
        return axios.create({ baseURL: 'https://service-provider-sarver.vercel.app', });
    }, []);

    //   request interceptors =======================
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user?.accessToken}`;
            return config;
        });
        //   response interceptors =========================
        const resInterceptor = axiosInstance.interceptors.response.use(res => {
            return res;
        }, err => {
            if (err.status === 401 || err.status === 403) {
                signout().then(() => {
                errorNotify()
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
        )

        return () => {
            axiosInstance.interceptors.request.eject(interceptor);
            axiosInstance.interceptors.response.eject(resInterceptor);
        };
    }, [user?.accessToken]);

    return axiosInstance;
};

export default useAxiosSecure