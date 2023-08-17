import { useState } from 'react';
import { Stack, Box, Container, Button, Typography, TextField, Link as Linkto, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
// import { Link } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  axios.defaults.withCredentials = true;

  const auth = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(username, password)
    let newErrors = {};

    if (!username) {
      newErrors.username = 'Введите логин';
    } 

    if (!password) {
      newErrors.password = 'Введите пароль';
    }

    if (Object.keys(newErrors).length === 0) {
      // Вы можете выполнить дополнительную обработку здесь, например, отправку данных на сервер
      
      // console.log(response);
      // try {
      auth.login(username, password);
      // } catch (error) {
      //   console.log(error)
      // }
      // console.log('Form submitted:');
    } else {
      setErrors(newErrors);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <Container 
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      <Box>
      <Box sx={{ width: 300, padding: 4, "borderRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"}}>
        <Stack spacing={2}>
          <Typography variant="h5">Вход</Typography>
          <TextField 
            size="small" 
            label="Логин" 
            value={username} 
            variant="outlined" 
            onChange={(e) => setUsername(e.target.value)} 
            onKeyPress={handleKeyPress}
            error={!!errors.username}
            helperText={errors.username}
          />
          {/* <TextField label="Пароль" value={password} variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/> */}
          <TextField
            size="small"
            label='Пароль'
            variant="outlined"
            onKeyPress={handleKeyPress}
            error={!!errors.password}
            helperText={errors.password}
            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" variant="contained" onClick={handleSubmit}>Войти</Button>
          <Linkto href="/forgot_password" underline="none">
            {/* <Link to="/forgot_password">Забыл пароль</Link> */}
            Забыл пароль
          </Linkto>
          <Linkto href="/register" underline="none">
            {/* <Link to="/forgot_password">Забыл пароль</Link> */}
            Регистрация
          </Linkto>
        </Stack>
      </Box>
      </Box>
    </Container>  
  );
};

export default Login;
