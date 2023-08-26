import { useState, useEffect } from 'react';
import { Stack, Box, Container, Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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

const DoctorEditClient = ({ disabled, display }) => {
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

  const [rejectionDate2, setRejectionDate2] = useState(null);
  const [room, setRoom] = useState('');
  const [gender, setGender] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState('');
  const [datePost, setDatePost] = useState(null);
  const [plannedDischargeDate, setPlannedDischargeDate] = useState(null);
  const [table, setTable] = useState('');
  const [therapist, setTherapist] = useState('');
  const [actualDischargeDate, setActualDischargeDate] = useState(null);
  const [additionalServices, setAdditionalServices] = useState('');

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const auth = useAuth();

  const {id} = useParams();
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

  const handlePaymentType = (event) => {
    setPaymentType(event.target.value);
  }

  const handleTreatmentType = (event) => {
    setTreatmentType(event.target.value);
  }

  const handlePatientType = (event) => {
    setPatientType(event.target.value);
  }

  const handleRoom = (event) => {
    setRoom(event.target.value);
  }

  const handleGender = (event) => {
    setGender(event.target.value);
  }

  const handleStage = (event) => {
    setStage(event.target.value);
  }

  const handleTable = (event) => {
    setTable(event.target.value);
  }

  const handleTherapist = (event) => {
    setTherapist(event.target.value);
  }

  const handleAdditionalServices = (event) => {
    setAdditionalServices(event.target.value);
  }

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

      const dateOtkaz2 = dayjs(response.data.dateOtkaz2);
      setRejectionDate2(dateOtkaz2);
      setRoom(response.data.palataNumber);
      setGender(response.data.pol);
      setCode(response.data.kod);
      setStage(response.data.etap);
      const date1 = dayjs(response.data.date1);
      setDatePost(date1);
      const vypiskaPlan = dayjs(response.data.vypiskaPlan);
      setPlannedDischargeDate(vypiskaPlan);
      setTable(response.data.stol);
      setTherapist(response.data.doctor);
      const vypiskaFact = dayjs(response.data.vypiskaFact);
      setActualDischargeDate(vypiskaFact);
      setAdditionalServices(response.data.dopUslugi);
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getPatient();
  }, []);

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
        dateOtkaz2: rejectionDate2,
        palataNumber: room,
        pol: gender,
        kod: code,
        etap: stage,
        date1: datePost,
        vypiskaPlan: plannedDischargeDate,
        stol: table,
        doctor: therapist,
        vypiskaFact: actualDischargeDate,
        dopUslugi: additionalServices
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
      <Typography variant="h5" sx={{mb: 4}} >Регистрация пациента</Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
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
              <TextField disabled size="small" className="txtField" label="Источник" value={source} variant="outlined" onChange={(e) => setSource(e.target.value)}/>
              <FormGroup>
                <FormControlLabel disabled control={<Checkbox onChange={dischargeSendCheckbox} size="small" checked={dischargeSend}/>} label="Отправка выписки врачу" />
                <FormControlLabel disabled control={<Checkbox onChange={hospNotifCheckbox} size="small" checked={hospNotif}/>} label="Напоминание о госпитализации" />
              </FormGroup>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Факт дата прихода (Приемный покой)" value={actualArrivalDate} onChange={(newValue) => setActualArrivalDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <FormGroup>
                <FormControlLabel disabled control={<Checkbox onChange={receivedByHoDCheckbox} size="small" checked={receivedByHoD}/>} label="Поступившие (Зав. отделению)" />
              </FormGroup>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack sx={{ flexGrow: 1 }} spacing={2}> 
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата напоминания о госпитализации" value={hospNotifDate} onChange={(newValue) => setHospNotifDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField disabled size="small" className="txtField" label="Код МКБ" value={MKBcode} variant="outlined" onChange={(e) => setMKBcode(e.target.value)}/>
              <FormControl disabled fullWidth size="small">
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
              <FormControl disabled fullWidth size="small">
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
              <FormControl disabled fullWidth size="small">
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
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Планируемая дата приема" value={plannedReceiptDate} onChange={(newValue) => setPlannedReceiptDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата отказа" value={rejectionDate} onChange={(newValue) => setRejectionDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <TextField disabled size="small" className="txtField" label="Комментарии" value={comments} variant="outlined" onChange={(e) => setComments(e.target.value)}/>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack spacing={2}> 
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled={disabled} slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата отказа" value={rejectionDate2} onChange={(newValue) => setRejectionDate2(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">№ Палаты</InputLabel>
                <Select
                  value={room}
                  label="№ Палаты"
                  onChange={handleRoom}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"д/н"}>д/н</MenuItem>
                  <MenuItem value={"201"}>201</MenuItem>
                  <MenuItem value={"202"}>202</MenuItem>
                  <MenuItem value={"203"}>203</MenuItem>
                  <MenuItem value={"204"}>204</MenuItem>
                  <MenuItem value={"205"}>205</MenuItem>
                  <MenuItem value={"206"}>206</MenuItem>
                  <MenuItem value={"207"}>207</MenuItem>
                  <MenuItem value={"208"}>208</MenuItem>
                  <MenuItem value={"209"}>209</MenuItem>
                  <MenuItem value={"210"}>210</MenuItem>
                  <MenuItem value={"211"}>211</MenuItem>
                  <MenuItem value={"212"}>212</MenuItem>
                  <MenuItem value={"213"}>213</MenuItem>
                  <MenuItem value={"214"}>214</MenuItem>
                  <MenuItem value={"301"}>301</MenuItem>
                  <MenuItem value={"302"}>302</MenuItem>
                  <MenuItem value={"303"}>303</MenuItem>
                  <MenuItem value={"304"}>304</MenuItem>
                  <MenuItem value={"305"}>305</MenuItem>
                  <MenuItem value={"306"}>306</MenuItem>
                  <MenuItem value={"307"}>307</MenuItem>
                  <MenuItem value={"308"}>308</MenuItem>
                  <MenuItem value={"309"}>309</MenuItem>
                  <MenuItem value={"310"}>310</MenuItem>
                  <MenuItem value={"311"}>311</MenuItem>
                  <MenuItem value={"312"}>312</MenuItem>
                  <MenuItem value={"313"}>313</MenuItem>
                  <MenuItem value={"314"}>314</MenuItem>
                  <MenuItem value={"401"}>401</MenuItem>
                  <MenuItem value={"402"}>402</MenuItem>
                  <MenuItem value={"403"}>403</MenuItem>
                  <MenuItem value={"404"}>404</MenuItem>
                </Select>
              </FormControl>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                <Select
                  value={gender}
                  label="Пол"
                  onChange={handleGender}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"Мужчина"}>Мужчина</MenuItem>
                  <MenuItem value={"Женщина"}>Женщина</MenuItem>
                </Select>
              </FormControl>
              <TextField disabled={disabled} size="small" className="txtField" label="Код" value={code} variant="outlined" onChange={(e) => setCode(e.target.value)}/>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Этап</InputLabel>
                <Select
                  value={stage}
                  label="Этап"
                  onChange={handleStage}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"КС-2"}>КС-2</MenuItem>
                  <MenuItem value={"КС-3"}>КС-3</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled={disabled} slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Дата пост-я" value={datePost} onChange={(newValue) => setDatePost(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled={disabled} slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Выписка план" value={plannedDischargeDate} onChange={(newValue) => setPlannedDischargeDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Стол</InputLabel>
                <Select
                  value={table}
                  label="Стол"
                  onChange={handleTable}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"№ 9"}>№ 9</MenuItem>
                  <MenuItem value={"№ 10"}>№ 10</MenuItem>
                  <MenuItem value={"№ 9 - зонд"}>№ 9 - зонд</MenuItem>
                  <MenuItem value={"№ 10 - зонд"}>№ 10 - зонд</MenuItem>
                </Select>
              </FormControl>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Лечящий врач</InputLabel>
                <Select
                  value={therapist}
                  label="Лечящий врач"
                  onChange={handleTherapist}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"doctor1"}>Doctor1</MenuItem>
                  <MenuItem value={"doctor2"}>Doctor2</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disabled={disabled} slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }} label="Выписка факт" value={actualDischargeDate} onChange={(newValue) => setActualDischargeDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl disabled={disabled} fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Требуются доп. услуги</InputLabel>
                <Select
                  value={additionalServices}
                  label="Требуются доп. услуги"
                  onChange={handleAdditionalServices}
                >
                  <MenuItem value={"default"}>Не указан</MenuItem>
                  <MenuItem value={"Да"}>Да</MenuItem>
                  <MenuItem value={"Нет"}>Нет</MenuItem>
                </Select>
              </FormControl>
              <Button sx={{ display: {display} }} type="submit" variant="contained" onClick={handleSubmit}>Сохранить</Button>
              <SnackbarComponent 
                open={open} 
                onClose={handleCloseSuccess} 
                severity={severity} 
                message={message} 
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>  
  );
};

export default DoctorEditClient;
