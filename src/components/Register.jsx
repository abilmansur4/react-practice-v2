import { useState } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

import SnackbarComponent from './SnackbarComponent';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ruleAccept, setRuleAccept] = useState(false);

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const auth = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

  // Уведомления
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setRuleAccept(event.target.checked);
    // console.log(ruleAccept);
  }

  // const handleSubmit = () => {
    // auth.login(username, password);
    // try{
    //   const response = await auth.register(username, password, email, phone, ruleAccept);
    //   if(response.status === 200){
    //     setMessage("Вы успешно прошли регистрацию!");
    //     setSeverity("success");
    //     setOpen(true);
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 2000);
    //   } else if (response.status === 400) {
    //     console.log(response.data.message);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    // auth.register(username, password, email, phone);
    
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(username, password)
    let newErrors = {};

    if (!username) {
      newErrors.username = 'Введите логин';
    } 

    if (!password) {
      newErrors.password = 'Введите пароль'
    } else if (password) {
      if (password.length < 6) {
        newErrors.password = 'Пароль должен состоят не менее из 6 символов';
      }
    }

    if (!email) {
      newErrors.email = 'Введите email'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!phone) {
      newErrors.phone = 'Введите номер телефона';
    }

    if (Object.keys(newErrors).length === 0) {
      // Вы можете выполнить дополнительную обработку здесь, например, отправку данных на сервер
      auth.register(username, password, email, phone);
    
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
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      <Box sx={{ width: 450, padding: 6, "bordeRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"}}>
        <Stack spacing={2}>
          <Typography variant="h5">Зарегистрироваться</Typography>
          <TextField 
            className="txtField" 
            label="Логин" 
            value={username} 
            variant="outlined" 
            onKeyPress={handleKeyPress} 
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField 
            className="txtField" 
            label="Пароль" 
            value={password} 
            variant="outlined" 
            type="password" 
            onKeyPress={handleKeyPress} 
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField 
            className="txtField" 
            label="Почта" 
            value={email} 
            variant="outlined" 
            type="email" 
            onKeyPress={handleKeyPress} 
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField 
            className="txtField" 
            label="Телефон" 
            value={phone} 
            variant="outlined" 
            type="text" 
            onKeyPress={handleKeyPress} 
            onChange={(e) => setPhone(e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          {/* <FormGroup>
            <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} size="small"/>} label="С правилами ознакомлен" />
          </FormGroup> */}
          <Button type="submit" variant="contained" onClick={handleSubmit}>Зарегистрироваться</Button>
          {/* <SnackbarComponent 
            open={open} 
            onClose={handleCloseSuccess} 
            severity={severity} 
            message={message} 
          /> */}
        </Stack>
      </Box>
    </Container>  
  );
};

export default Register;
