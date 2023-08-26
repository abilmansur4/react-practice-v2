import { useState, useEffect } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../hook/useAuth';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import 'dayjs/locale/ru';

import SnackbarComponent from '../SnackbarComponent';

const ManagerEditClient = ({ user, disabled, display }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

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

  const [hospNotifDate, setHospNotifDate] = useState(null);
  const [MKBcode, setMKBcode] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [patientType, setPatientType] = useState('');
  const [plannedReceiptDate, setPlannedReceiptDate] = useState(null);
  const [rejectionDate, setRejectionDate] = useState(null);
  const [comments, setComments] = useState('');

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const auth = useAuth();

  const {id} = useParams();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from?.pathname || "/";

  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  };

  const getPatient = () => {
    axios.get("http://localhost:5000/api/patient/" + id, config)
    .then((response) => {
      setFio(response.data.fio);
      const dateFirstAt = dayjs(response.data.dateFirstAt);
      setApplicationDate(dateFirstAt);
      setIin(response.data.iin);
      setPhone(response.data.telephone);
      setDiagnosis(response.data.diagnoz);
      const dateKMIS = dayjs(response.data.dateKMIS);
      setDischargeDateByKMIS(dateKMIS);
      const dateReab = dayjs(response.data.dateReab);
      setLastRehabDischargeDate(dateReab);
      setSource(response.data.istochnik);
      let otp1 = JSON.parse(response.data.otp1);
      setDischargeSend(otp1);
      let napom = JSON.parse(response.data.napom);
      setHospNotif(napom);
      const dateFact = dayjs(response.data.dateFact);
      setActualArrivalDate(dateFact);
      let postZav = JSON.parse(response.data.postZav);
      setReceivedByHoD(postZav);

      const dateNapomonaniya = dayjs(response.data.dateNapomonaniya);
      setHospNotifDate(dateNapomonaniya);
      setMKBcode(response.data.kodMKB);
      setPaymentType(response.data.vidOplaty);
      setTreatmentType(response.data.vidLetchenie);
      setPatientType(response.data.viewPatient);
      const datePriem = dayjs(response.data.datePriem);
      setPlannedReceiptDate(datePriem);
      const dateOtkaz = dayjs(response.data.dateOtkaz);
      setRejectionDate(dateOtkaz);
      setComments(response.data.comment);
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getPatient();
  }, []);

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

  const handleSource = (event) => {
    setSource(event.target.value);
  }

  const receivedByHoDCheckbox = (event) => {
    setReceivedByHoD(event.target.checked);
  }

  const handlePaymentType = (event) => {
    setPaymentType(event.target.value);
  }

  const handleTreatmentType = (event) => {
    setTreatmentType(event.target.value);
  }

  const handlePatientType = (event) => {
    setPatientType(event.target.value);
  }

  const handleSubmit = async () => {
    await axios.put("http://localhost:5000/api/patient/" + id, {
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
        dateNapomonaniya: hospNotifDate,
        kodMKB: MKBcode,
        vidOplaty: paymentType,
        vidLetchenie: treatmentType,
        viewPatient: patientType,
        datePriem: plannedReceiptDate,
        dateOtkaz: rejectionDate,
        comment: comments,
        dateOtkaz2: "2023-07-19 18:10:04.083+05",
        palataNumber: 1,
        pol: '',
        kod: '',
        etap: '',
        date1: "2023-07-19 18:10:04.083+05",
        vypiskaPlan: "2023-07-19 18:10:04.083+05",
        stol: '',
        doctor: '',
        vypiskaFact: "2023-07-19 18:10:04.083+05",
        dopUslugi: ''
    }, config)
      .then((response) => {
        if (response.status === 200) {
          setMessage("Данные успешно сохранены!");
          setSeverity("success");
          setOpen(true);
          setTimeout(() => {
            navigate('/patients');
          }, 1800)
        };
      })
      .catch((error) => {
        console.log(error);
      })
  };

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
      <Box sx={{ width: "100%", padding: 4, "bordeRadius": "20px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"}}>
      <Typography variant="h5" sx={{mb: 3}}>Регистрация пациента</Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Stack spacing={2}>
              <TextField disabled size="small" className="txtField" label="ФИО" value={fio} variant="outlined" onChange={(e) => setFio(e.target.value)}/>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true } }} label="Дата обращения" value={applicationDate} onChange={(newValue) => setApplicationDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField disabled size="small" className="txtField" label="ИИН" value={iin} variant="outlined" onChange={(e) => setIin(e.target.value)}/>
              <TextField disabled size="small" className="txtField" label="Телефон" value={phone} variant="outlined" onChange={(e) => setPhone(e.target.value)}/>
              <TextField disabled size="small" className="txtField" label="Диагноз, примечание" value={diagnosis} variant="outlined" onChange={(e) => setDiagnosis(e.target.value)}/>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата выписки по КМИС" value={dischargeDateByKMIS} onChange={(newValue) => setDischargeDateByKMIS(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата выписки последней реабилитации(госпитализации)" value={lastRehabDischargeDate} onChange={(newValue) => setLastRehabDischargeDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              {/* <TextField disabled size="small" className="txtField" label="Источник" value={source} variant="outlined" onChange={(e) => setSource(e.target.value)}/> */}
              <FormControl disabled fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Источник</InputLabel>
                <Select
                  value={source}
                  label="Источник"
                  onChange={handleSource}
                >
                  <MenuItem value={"Whatsapp"}>Whatsapp</MenuItem>
                  <MenuItem value={"Telegram"}>Telegram</MenuItem>
                  <MenuItem value={"Телефон"}>Телефон</MenuItem>
                </Select>
              </FormControl>
              <FormGroup>
                <FormControlLabel disabled control={<Checkbox onChange={dischargeSendCheckbox} size="small" checked={dischargeSend} />} label="Отправка выписки врачу" />
                <FormControlLabel disabled control={<Checkbox onChange={hospNotifCheckbox} size="small"/>} checked={hospNotif} label="Напоминание о госпитализации" />
              </FormGroup>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Факт дата прихода (Приемный покой)" value={actualArrivalDate} onChange={(newValue) => setActualArrivalDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <FormGroup>
                <FormControlLabel disabled control={<Checkbox onChange={receivedByHoDCheckbox} size="small" checked={receivedByHoD} />} label="Поступившие (Зав. отделению)" />
              </FormGroup>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack sx={{ flexGrow: 1 }} spacing={2}> 
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled={disabled} slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата напоминания о госпитализации" value={hospNotifDate} onChange={(newValue) => setHospNotifDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField disabled={disabled} size="small" className="txtField" label="Код МКБ" value={MKBcode} variant="outlined" onChange={(e) => setMKBcode(e.target.value)}/>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Вид оплаты</InputLabel>
                <Select
                  value={paymentType}
                  label="Вид оплаты"
                  onChange={handlePaymentType}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"Бесплатный"}>Бесплатный</MenuItem>
                  <MenuItem value={"Платный"}>Платный</MenuItem>
                </Select>
              </FormControl>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Вид лечения</InputLabel>
                <Select
                  value={treatmentType}
                  label="Вид лечения"
                  onChange={handleTreatmentType}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"Дневной"}>Дневной</MenuItem>
                  <MenuItem value={"Круглосуточный"}>Круглосуточный</MenuItem>
                </Select>
              </FormControl>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Вид пациента</InputLabel>
                <Select
                  value={patientType}
                  label="Вид пациента"
                  onChange={handlePatientType}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"Ухаживающий"}>Ухаживающий</MenuItem>
                  <MenuItem value={"Самостоятельный"}>Самостоятельный</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled={disabled} slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Планируемая дата приема" value={plannedReceiptDate} onChange={(newValue) => setPlannedReceiptDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled={disabled} slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата отказа" value={rejectionDate} onChange={(newValue) => setRejectionDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField disabled={disabled} size="small" className="txtField" label="Комментарии" value={comments} variant="outlined" onChange={(e) => setComments(e.target.value)}/>
              <Button sx={{ display: {display}}} type="submit" variant="contained" onClick={handleSubmit}>Сохранить</Button>
              <SnackbarComponent 
                open={open} 
                onClose={handleCloseSuccess} 
                severity={severity} 
                message={message} 
              />
            </Stack>
          </Grid>
          {/* <Grid xs="6" md="6">
            
          </Grid> */}
        </Grid>
      </Box>
    </Container>  
    </>
  );
};

export default ManagerEditClient;
