// import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton  from '@mui/material/IconButton';

const FormDialog = ({
  openFormDialog, closeFormDialog, handleChange, formDialogTitle, validateForm,
  username, setUsername, 
  email, setEmail,
  firstname, setFirstname,
  lastname, setLastname,
  secondname, setSecondname,
  phone, setPhone,
  iin, setIin,
  role, setRole, handleRole,
  nameOrganization, setNameOrganization,
  password, setPassword,
  showPassword, setShowPassword,
  handleClickShowPassword, handleMouseDownPassword,
  button, 
  errors, setErrors
}) => {

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });

  const update = async (user) => {
    await axios.put("http://localhost:5000/api/users/" + localStorage.userId, user)
      .then((response) => {
        if (response.status === 200) {
          // setSuccessOpen(true);
          console.log("uspeshno")
        };
      }
    )
  }

  return (
    <div>
      <Dialog open={openFormDialog} onClose={closeFormDialog}>
        <DialogTitle>{formDialogTitle}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 400, padding: 2 }}>
          <Stack spacing={2}>
            <TextField className="txtField" required error={!!errors.username} helperText={errors.username} label="Логин" value={username} variant="standard" type="text" size="small" onChange={(e) => setUsername(e.target.value)}/>
            <TextField className="txtField" required error={!!errors.firstname} helperText={errors.firstname} label="Имя" value={firstname || ''} variant="standard" type="text" onChange={(e) => setFirstname(e.target.value)}/>
            <TextField className="txtField" required error={!!errors.lastname} helperText={errors.lastname} label="Фамилия" value={lastname || ''} variant="standard" type="text" onChange={(e) => setLastname(e.target.value)}/>
            <TextField className="txtField" id="standard-helperText1" label="Отчество" value={secondname || ''} variant="standard" type="text" onChange={(e) => setSecondname(e.target.value)}/>
            <TextField className="txtField" error={!!errors.email} helperText={errors.email} required label="Почта" value={email} variant="standard" type="email" onChange={(e) => setEmail(e.target.value)}/>
            <TextField className="txtField" error={!!errors.phone} helperText={errors.phone} required label="Телефон" value={phone || ''} variant="standard" type="text" onChange={(e) => setPhone(e.target.value)}/>
            <TextField className="txtField" error={!!errors.iin} helperText={errors.iin} required label="ИИН" value={iin || ''} variant="standard" type="text" onChange={(e) => setIin(e.target.value)}/>
            <FormControl fullWidth size="small" error={!!errors.role}>
              <InputLabel id="demo-simple-select-label">Роль</InputLabel>
              <Select
                value={role}
                label="Роль"
                onChange={handleRole}
              >
                <MenuItem value={3}>Админ</MenuItem>
                <MenuItem value={4}>Ресепшен</MenuItem>
                <MenuItem value={2}>Менеджер</MenuItem>
                <MenuItem value={1}>Врач</MenuItem>
              </Select>
              <FormHelperText>{errors.role}</FormHelperText>
            </FormControl>
            <TextField className="txtField" id="standard-helperText2" label="Название организации" value={nameOrganization || ''} variant="standard" type="text" onChange={(e) => setNameOrganization(e.target.value)}/>
            {/* <TextField className="txtField" label="Пароль" value={password || ''} variant="standard" type="password" onChange={(e) => setPassword(e.target.value)}/> */}
            <TextField
            required
            error={!!errors.password} 
            helperText={errors.password}
            label='Пароль'
            variant="standard"
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
              ),
              autoComplete: 'new-password'
            }}
          />
            {/* <Button type="submit" variant="contained" onClick={handleSubmit}>Сохранить</Button> */}
            {/* <SnackbarComponent open={successOpen} onClose={handleCloseSuccess} severity="success" message="Данные успешно сохранены!"  />
            <SnackbarComponent key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleCloseError} severity="error" message="Ошибка!"  /> */}
          </Stack>
        </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button variant="contained" onClick={validateForm}>{button}</Button>
          <Button onClick={closeFormDialog}>Отменить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;