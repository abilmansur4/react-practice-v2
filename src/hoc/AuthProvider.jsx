import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  // const [accessToken, setAccessToken] = useState('');
  // const [refreshToken, setRefreshToken] = useState('');
  // const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //   axios.get("http://localhost:3001/login").then((response) => {
  //     // console.log(response);
  //     if (response.data.loggedIn === true) {
  //       setUser(response.data.user[0].username);
  //       // navigate("/", { replace: true });
  //       // auth.login(username);
  //       // console.log(response);
  //     }
  //   });
  // });

  // const config = {
  //   headers: {
  //     "authorization" : "accessToken " + localStorage.getItem("accessToken")
  //   }
  // }

  // const config2 = {
  //   headers: {
  //     "authorization" : "refreshToken " + localStorage.getItem("refreshToken")
  //   }
  // }

  const login = async (user, password) => {
    await axios
      .post("http://localhost:5000/api/auth", {
        username: user,
        password: password,
      })
      .then((response) => {
        if (response.data) {
          // console.log(response.data.user);
          localStorage.setItem("userId", response.data.user.id);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("userRole", response.data.user.roles[0].id);
          setAccessToken(localStorage.getItem("accessToken"));
          setRefreshToken(localStorage.getItem("refreshToken"));
          setUserRole(localStorage.getItem("userRole"));
          // setAccessToken(response.data.accessToken);
          // setRefreshToken(response.data.refreshToken);
          // setUserRole(response.data.user.roles[0].id);
          navigate("/main");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    axios.post("http://localhost:5000/api/auth/logout")
      .then((response) => {
      // console.log(response);
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      setRefreshToken(null);
      navigate("/login", { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
    
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    // setAccessToken(null);
    // setRefreshToken(null);
  };

  const register = (username, password, email, phone) => {
    axios.post("http://localhost:5000/api/auth/registration", {
      username: username,
      password: password,
      email: email,
      phone: phone,
      positionId: 1,
      roleId: [4],
      ruleAccept: true
    })
    .then((response) => { 
      if (response.data) {
        console.log(response);
        // localStorage.setItem("userRole", response.data.user.roles[0].id);
        // localStorage.setItem("userId", response.data.user.id);
        // localStorage.setItem("accessToken", response.data.accessToken);
        // localStorage.setItem("refreshToken", response.data.refreshToken);
        // setAccessToken(localStorage.getItem("accessToken"));
        // setRefreshToken(localStorage.getItem("refreshToken"));
        navigate("/login");
        
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  const value = { accessToken, refreshToken, userRole, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

