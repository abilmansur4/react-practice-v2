import { useState, useEffect } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useAuth } from '../../hook/useAuth';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import 'dayjs/locale/ru';

import SnackbarComponent from '../SnackbarComponent';

const AddPatient = () => {
  const {id} = useParams();
  const [fio, setFio] = useState('');
  const [applicationDate, setApplicationDate] = useState(null);
  const [iin, setIin] = useState('');
  const [phone, setPhone] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [dischargeDateByKMIS, setDischargeDateByKMIS] = useState(null);
  const [lastRehabDischargeDate, setLastRehabDischargeDate] = useState(null);
  const [source, setSource] = useState('');
  const [dischargeSend, setDischargeSend] = useState(false);
  const [hospNotif, setHospNotif] = useState(false);
  const [actualArrivalDate, setActualArrivalDate] = useState(null);
  const [receivedByHoD, setReceivedByHoD] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const config = {
    headers: {
      'authorization' : 'accessToken ' + localStorage.getItem('accessToken')
    }
  }

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

  const dischargeSendCheckbox = (event) => {
    setDischargeSend(event.target.checked);
  }

  const hospNotifCheckbox = (event) => {
    setHospNotif(event.target.checked);
  }

  const receivedByHoDCheckbox = (event) => {
    setReceivedByHoD(event.target.checked);
  }

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/patient",
      {
        fio: fio,
        dateFirstAt: applicationDate,
        iin: iin,
        telephone: phone,
        diagnoz: diagnosis,
        dateKMIS: dischargeDateByKMIS,
        dateReab: lastRehabDischargeDate,
        istochnik: source,
        otp1: dischargeSend,
        napom: hospNotif,
        dateFact: actualArrivalDate,
        postZav: receivedByHoD,
        dateNapomonaniya: "2023-01-01 18:10:04.083+05",
        kodMKB: 1,
        vidOplaty: "default",
        vidLetchenie: "default",
        viewPatient: "default",
        datePriem: "2023-01-01 18:10:04.083+05",
        dateOtkaz: "2023-01-01 18:10:04.083+05",
        comment: '',
        dateOtkaz2: "2023-01-01 18:10:04.083+05",
        palataNumber: "default",
        pol: "default",
        kod: '',
        etap: "default",
        date1: "2023-01-01 18:10:04.083+05",
        vypiskaPlan: "2023-01-01 18:10:04.083+05",
        stol: "default",
        doctor: "default",
        vypiskaFact: "2023-01-01 18:10:04.083+05",
        dopUslugi: "default"
      }, config)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        // alert(error.response.data.message);
        console.log(error)
      });

    setMessage("Пациент успешно зарегистрирован!");
    setSeverity("success");
    setOpen(true);
    clearFields();
    setTimeout(() => {
      navigate("/patients")
    }, 1800)
  };


  const clearFields = () => {
    setFio('');
    setApplicationDate(null);
    setIin('');
    setPhone('');
    setDiagnosis('');
    setDischargeDateByKMIS(null);
    setLastRehabDischargeDate(null);
    setSource('');
    setDischargeSend(false);
    setHospNotif(false);
    setActualArrivalDate(null);
    setReceivedByHoD(false);
  }

  // useEffect(() => {
  //   getPatient();
  // }, []);

  return (
    <>
    <Button type="submit" variant="text" onClick={() => navigate(-1)} sx={{ width:100, mb: 1}}><ArrowBackIcon /> Назад </Button>
    <Container 
      sx={{
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      <Box sx={{ width: 560, padding: 4, "bordeRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"}}>
        <Stack spacing={2}>
          <Typography variant="h5">Регистрация пациента</Typography>
          <TextField size="small" className="txtField" label="ФИО" value={fio} variant="outlined" onChange={(e) => setFio(e.target.value)}/>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DemoContainer components={['DatePicker']}>
              <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата обращения" value={applicationDate} onChange={(newValue) => setApplicationDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <TextField size="small" className="txtField" label="ИИН" value={iin} variant="outlined" onChange={(e) => setIin(e.target.value)}/>
          <TextField size="small" className="txtField" label="Телефон" value={phone} variant="outlined" onChange={(e) => setPhone(e.target.value)}/>
          <TextField size="small" className="txtField" label="Диагноз, примечание" value={diagnosis} variant="outlined" onChange={(e) => setDiagnosis(e.target.value)}/>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DemoContainer components={['DatePicker']}>
              <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата выписки по КМИС" value={dischargeDateByKMIS} onChange={(newValue) => setDischargeDateByKMIS(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DemoContainer components={['DatePicker']}>
              <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата выписки последней реабилитации(госпитализации)" value={lastRehabDischargeDate} onChange={(newValue) => setLastRehabDischargeDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <TextField size="small" className="txtField" label="Источник" value={source} variant="outlined" onChange={(e) => setSource(e.target.value)}/>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={dischargeSendCheckbox} size="small" checked={dischargeSend} />} label="Отправка выписки врачу" />
          {/* </FormGroup>
          <FormGroup> */}
            <FormControlLabel control={<Checkbox onChange={hospNotifCheckbox} size="small" checked={hospNotif} />} label="Напоминание о госпитализации" />
          </FormGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DemoContainer components={['DatePicker']}>
              <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Факт дата прихода (Приемный покой)" value={actualArrivalDate} onChange={(newValue) => setActualArrivalDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={receivedByHoDCheckbox} size="small" checked={receivedByHoD} />} label="Поступившие (Зав. отделению)" />
          </FormGroup>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Добавить</Button>
          <SnackbarComponent 
            open={open} 
            onClose={handleCloseSuccess} 
            severity={severity} 
            message={message} 
          />
        </Stack>
      </Box>
    </Container>  
    </>
  );
};

export default AddPatient;
