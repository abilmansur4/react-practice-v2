import axios from "axios";
import { useState, useEffect } from 'react';
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Box, Container, Button, IconButton, Tooltip, TextField, Checkbox, FormControlLabel, FormGroup, Typography, Link } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cabinet = () => {

  axios.defaults.withCredentials = true;

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [iin, setIin] = useState('');
  const [nameOrganization ,setNameOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');

  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  };

  const config1 = {
    headers: {
      "refreshToken" : "refreshToken " + localStorage.getItem('refreshToken')
    }
  };

  const style = {
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#434343",
    }
  }
  
  useEffect(() => {

    axios.get("http://localhost:5000/api/users/user=" + localStorage.getItem("userId"), config)
      .then((response) => {
        // console.log(response);
        setUsername(response.data.username);
        setFirstname(response.data.firstName);
        setLastname(response.data.lastName);
        setSecondname(response.data.secondName);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setIin(response.data.iin);
        setNameOrganization(response.data.nameOrganization);
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   axios.get("http://localhost:5000/api/auth/refresh")
        //   .then((response) => {
        //     localStorage.setItem("accessToken", response.data.accessToken);
        //     localStorage.setItem("refreshToken", response.data.refreshToken);
        //   })
        // }
      })
  }, [])


  // axios.get("http://localhost:5000/api/users/user=" + localStorage.getItem("userId"), config)
  //   .then((response) => {
  //     console.log(response.data);
  //     setUsername(response.data.username);
  //     setFirstname(response.data.firstName);
  //     setLastname(response.data.lastName);
  //     setSecondname(response.data.secondName);
  //     setEmail(response.data.email);
  //     setPhone(response.data.phone);
  //     setIin(response.data.iin);
  //     setNameOrganization(response.data.nameOrganization);
      
  //   })
  

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = () => {
    // auth.login(username, password);
    auth.update(username, firstname, lastname, secondname, email, phone, iin, nameOrganization, password);
    
  };

  // const testProj = () => {
  //   axios.post("http://localhost:5000/api/project/user", {
  //     "title": "My Project",
  //     "roleId": 4,
  //     "typeId": 1,
  //     "capital": 9999999,
  //     "date": "2023-06-10 18:41:41.252+05",
  //     "dateStart": "2023-06-10 18:41:41.252+05",
  //     "description": "First test project",
  //     "descriptionMin": "Project",
  //     "image": "3333",
  //     "userId": 2,
  //     "username": "user",
  //     "investors": [],
  //     "regionId": 4,
  //     "stateId": 4,
  //     "money": "some money...",
  //     "ownedMoney": "ownedMoney",
  //     "status": true,
  //     "inHome": true,
  //     "desiredPartnerCount": 3,
  //     "expectedProfitability": "123123",
  //     "materialRes": "123123123123",
  //     "intelligenceRes": "qwerty"
  //   }, config)
  //   .then((response) => {
  //     console.log(response)
  //   }); 
  // }

  return (
    // <Typography variant="h1">Cabinet</Typography>

  <>
    <Button type="submit" variant="text" onClick={() => navigate(-1)} sx={{ width:100}}><ArrowBackIcon /> Назад </Button>
    <Container 
      sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"  
    }}>
      <Box sx={{width: 500, padding: 6, "borderRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.09)"}}>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
          
            <Typography variant="h5">Кабинет</Typography>
            {/* <button onClick={testProj}>proj</button> */}
            <Tooltip title="Редактировать">
              {/* <Link href="/cabinet/edit" underline="none" aria-label="Редактировать профиль">
                <EditIcon />
              </Link> */}
              <IconButton onClick={() => { navigate("/cabinet/edit")}}>
                <EditIcon />
                {/* <Link href="/cabinet/edit" underline="none" color="inherit">
                  <EditIcon />
                </Link> */}
              </IconButton>
            </Tooltip>
            
            
          </Stack>
          <Stack spacing={2}>
            <TextField sx={style} size="small" disabled className="txtField" label="Логин" value={username || ''} variant="standard" type="text" size="small" onChange={(e) => setUsername(e.target.value)}/>
            <TextField sx={style} size="small" disabled className="txtField" label="Имя" value={firstname || ''} variant="standard" type="text" onChange={(e) => setFirstname(e.target.value)}/>
            <TextField sx={style} size="small" disabled className="txtField" label="Фамилия" value={lastname || ''} variant="standard" type="text" onChange={(e) => setLastname(e.target.value)}/>
            <TextField sx={style} size="small" disabled className="txtField" label="Отчество" value={secondname || ''} variant="standard" type="text" onChange={(e) => setSecondname(e.target.value)}/>
            <TextField sx={style} size="small" disabled className="txtField" label="Почта" value={email || ''} variant="standard" type="email" onChange={(e) => setEmail(e.target.value)}/>
            <TextField sx={style} size="small" disabled className="txtField" label="Телефон" value={phone || ''} variant="standard" type="text" onChange={(e) => setPhone(e.target.value)}/>
            <TextField sx={style} size="small" disabled className="txtField" label="ИИН" value={iin || ''} variant="standard" type="text" onChange={(e) => setIin(e.target.value)}/>
            <TextField sx={style} size="small" disabled className="txtField" label="Название организации" value={nameOrganization || ''} variant="standard" type="text" onChange={(e) => setNameOrganization(e.target.value)}/>
            {/* <TextField disabled className="txtField" label="Пароль" value={password} variant="standard" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <TextField className="txtField" label="Повторите пароль" value={passwordSecond} variant="standard" type="password" onChange={(e) => setPasswordSecond(e.target.value)}/> */}
            {/* <Button type="submit" variant="contained" onClick={handleSubmit}>Сохранить</Button> */}
          </Stack>
        </Stack>
      </Box>
    </Container>
  </>
  ) 
};

export default Cabinet;