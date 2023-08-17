import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../hook/useAuth";

const TokenManager = () => {

  const auth = useAuth();

  const updateToken = async () => {
    await axios.get("http://localhost:5000/api/auth/refresh", {withCredentials: true})
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        // auth.setAccessToken(response.data.accessToken);
        // auth.setRefreshToken(response.data.refreshToken);
      })
      .catch((error) => {
        // console.log(error)
      })
  };

  useEffect(() => {
    updateToken();
    // Установите интервал обновления токена в соответствии с вашими требованиями
    const interval = setInterval(updateToken, 1500000); // Обновление токена

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

};

export default TokenManager;
