import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tooltip from '@mui/material/Tooltip';
import IconButton  from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SearchUsers from './SearchUsers';
import SnackbarComponent from '../SnackbarComponent';
import FormDialog from '../FormDialog';

const Users = () => {

  axios.defaults.withCredentials = true;

  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [phone, setPhone] = useState('');
  const [iin, setIin] = useState('');
  const [role, setRole] = useState('');
  const [nameOrganization ,setNameOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [button, setButton] = useState('');
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formDialogTitle, setFormDialogTitle] = useState('');
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [user, setUser] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Количество элементов на странице
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  

  const [searchResults, setSearchResults] = useState([]);

  const currentItems = searchResults.slice(firstIndex, lastIndex); 

  const [userForSearch, setUserForSearch] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    iin: '',
    role: '',
    password: '',
  });
  
  const config = {
    headers: {
      "authorization" : "accessToken " + localStorage.getItem('accessToken')
    }
  };

  const navigate = useNavigate();

  const handleRole = (e) => {
    setRole(e.target.value);
  }

  // Получение всех пользователей
  const getUsers = () => {
    axios.get("http://localhost:5000/api/users", config)
    .then((response) => {
      console.log(response);
      const sortedItems = response.data.slice().sort((a, b) => a.id - b.id);
      setUsers(sortedItems);
      setSearchResults(sortedItems);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Переключение страниц
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Создание пользователя
  const createUser = () => {
    setButton("Создать")
    setIsEditingUser(false);
    setFormDialogTitle("Создать пользователя");
    setOpenFormDialog(true);
  }

  const create = async (user) => {
    // console.log(user);
    // const usr = {...user, positionId: '1'};
    await axios.post("http://localhost:5000/api/users/create", user, config)
      .then((response) => {
        console.log(response);
        const userr = {
          id: response.data.id,
          username: response.data.username,
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          secondname: response.data.secondName,
          email: response.data.email,
          phone: response.data.phone,
          iin: response.data.iin,
          roles: response.data.roles[0].id,
          nameOrganization: response.data.nameOrganization,
          password: user.password,
        }
        closeFormDialog();
        setMessage("Пользователь успешно создан!");
        setSeverity("success");
        setOpen(true);
        // setUsers([...users, userr]);
        // setSearchResults([...users, userr]);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setSeverity("error");
        setOpen(true);
      })
      const result = getUsers();
      setUsers(...users, result);
  }

  // Поиск пользователя
  const searchUser = () => {
    console.log(userForSearch);
    handleSearch();
  }

  const handleSearch = () => {
    const results = users.filter(user => user.username.includes(userForSearch));
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handleChangeSearchQuery = (event) => {
    setUserForSearch(event.target.value);
    handleSearch();
  };

  const handleResetSearch = () => {
    setUserForSearch('');
    getUsers();
    setCurrentPage(1);
  };

  // Удаление пользователя
  const deleteUser = (id) => {
    axios.delete("http://localhost:5000/api/users/" + id, config)
    .then((response) => {
      const result = getUsers();
      setUsers(result);
    })
  }

  const handleClickOpen = (user) => {
    setUser(user);
    setopenDeleteDialog(true);
  };

  const handleClose = () => {
    setopenDeleteDialog(false);
  };

  const handleDeleteUser = () => {
    deleteUser(user.id);
    // const updatedData = users.filter(item => item.id !== id);
    // setUsers(updatedData);
    handleClose();
    
    setMessage("Пользователь успешно удален!");
    setSeverity("success");
    setOpen(true);
    // setTimeout(() => {
    //   navigate(0);
    // }, 2000);
    
  }

  // Редактирование пользователя
  const handleClickOpenFormDialog = (user) => {
    setIsEditingUser(true);
    setButton("Сохранить");
    setId(user.id);
    setUsername(user.username);
    setFirstname(user.firstName);
    setLastname(user.lastName);
    setSecondname(user.secondName);
    setPhone(user.phone);
    setEmail(user.email);
    setIin(user.iin);
    setRole(user.roles[0]?.id);
    setNameOrganization(user.nameOrganization);
    setFormDialogTitle("Редактировать пользователя")
    setOpenFormDialog(true);
  }

  // Сохранить редактирование или создание пользователя
  const handleChange = (event) => {
    const user = {}

    user.username = username;
    user.firstName = firstname;
    user.lastName = lastname;
    user.secondName = secondname;
    user.email = email;
    user.phone = phone;
    user.iin = iin;
    // user.roles = role;
    user.nameOrganization = nameOrganization;
    user.password = password;
    user.positionId = 1;

    const updatedUser = users.map(item => {
      if (item.id === id) {
        return { ...item, ...user};
      }
      return item;
    });

    setUsers(updatedUser);

    if(isEditingUser === false) {
      user.roles = [role]
      create(user);
      console.log(user);
    } else {
      // user.roles = [{id: role, usersRoles : {userId: id, roleId: role}}];
      // user.roles = [parseInt(role)];
      update(user);
      console.log(user);
    }

  };

  const update = async (user) => {
    await axios.put("http://localhost:5000/api/users/" + id, user, config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          closeFormDialog();
          setMessage("Пользователь успешно отредактирован!");
          setSeverity("success");
          setOpen(true);
          // setTimeout(() => {
          //   navigate(0);
          // }, 2000);
        };
      })
      .catch((error) => {
        console.log(error);
      })
      const result = getUsers();
      setUsers(...users, result);
  }

  const closeFormDialog = () => {
    setOpenFormDialog(false);
    setUsername('');
    setFirstname('');
    setLastname('');
    setSecondname('');
    setEmail('');
    setPhone('');
    setIin('');
    setRole('');
    setNameOrganization('');
    setErrors({
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      iin: '',
      role: '',
      password: '',
    });
  }

  // Уведомления
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Form validation
  const validateForm = (event) => {
    event.preventDefault();

    let errors = {};

    if (!username) {
      errors.username = "Введите логин пользователя"
    } 

    if (!firstname) {
      errors.firstname = "Введите имя пользователя"
    } 

    if (!lastname) {
      errors.lastname = "Введите фамилию пользователя"
    } 

    if (!email) {
      errors.email = "Введите email"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Неправильный формат email";
    }

    if (!phone) {
      errors.phone = "Введите номер телефона пользователя"
    } 

    if (!iin) {
      errors.iin = "Введите ИИН пользователя"
    } 

    if (!role) {
      errors.role = "Выберите роль пользователя"
    } 

    if (isEditingUser === false) {
      if (!password) {
        errors.password = "Введите пароль пользователя"
      } else if (password) {
        if (password.length < 6) {
          errors.password = "Пароль должен состоят не менее из 6 символов";
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      handleChange();
      // console.log('Form submitted');
    } else {
      setErrors(errors);
    }
  }

  useEffect(() => {

    getUsers();
  }, [])

  return (
    <>
    <Button type="submit" variant="text" onClick={() => navigate(-1)} sx={{ width:100}}><ArrowBackIcon /> Назад </Button>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Stack spacing={2}>
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
        <Grid xs={10}>
          <SearchUsers 
            userForSearch={userForSearch} 
            setUserForSearch={setUserForSearch} 
            searchUser={searchUser} 
            handleChangeSearchQuery={handleChangeSearchQuery}
            handleResetSearch={handleResetSearch}
          />
        </Grid>
        <Grid xs={2}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={createUser}>Создать</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{width: 800}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Действия</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Tooltip title="Редактировать">
                    <IconButton onClick={() => handleClickOpenFormDialog(user)}>
                      <EditIcon sx={{ width: 14, height: 14 }} />
                    </IconButton>
                  </Tooltip>
                  { user.id === 1 ? 
                  (<Box />) : 
                  (<Tooltip title="Удалить">
                  <IconButton onClick={() => handleClickOpen(user)}>
                    <HighlightOffIcon sx={{ width: 14, height: 14 }} />
                  </IconButton>
                </Tooltip>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        count={Math.ceil(users?.length / itemsPerPage) || 1}
        page={currentPage}
        onChange={handlePageChange}
      />
      <div>
        <Dialog
          open={openDeleteDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы действительно хотите удалить пользователя {user.username} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteUser}>Да</Button>
            <Button onClick={handleClose} autoFocus>Нет</Button>
          </DialogActions>
        </Dialog>
      </div>

      <FormDialog 
        openFormDialog={openFormDialog} 
        closeFormDialog={closeFormDialog} 
        handleChange={handleChange}
        formDialogTitle={formDialogTitle}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
        secondname={secondname}
        setSecondname={setSecondname}
        phone={phone}
        setPhone={setPhone}
        iin={iin}
        setIin={setIin}
        role={role}
        setRole={setRole}
        handleRole={handleRole}
        nameOrganization={nameOrganization}
        setNameOrganization={setNameOrganization}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        button={button}
        setButton={setButton}
        errors={errors}
        setErrors={setErrors}
        validateForm={validateForm}
      />
      <SnackbarComponent 
        open={open} 
        onClose={handleCloseSuccess} 
        severity={severity} 
        message={message} 
      />
      </Stack>
    </Box>
    </>
  )
};

export default Users;