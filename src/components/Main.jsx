import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { useAuth } from "../hook/useAuth";
import { useNavigate, useHistory } from "react-router-dom";

const Main = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const userData = [
    {title: "Кабинет", link: "/cabinet", image: "/images/profile.svg"},
    {title: "Регистратура", link: "/patients", image: "/images/library.svg"},
    // {title: "Проекты", link: "/cabinet", image: "/images/process.svg"},
    // {title: "Документооборот", link: "/cabinet", image: "/images/docs.svg"},
    // {title: "Задачи", link: "/cabinet", image: "/images/tasks.svg"},
    // {title: "Новости", link: "/cabinet", image: "/images/news.svg"},
    // {title: "Справочник", link: "/cabinet", image: "/images/spravochnik.svg"}
  ]

  const managerData = [
    {title: "Кабинет", link: "/cabinet", image: "/images/profile.svg"},
    {title: "Библиотека", link: "/cabinet", image: "/images/library.svg"},
    {title: "Пациенты", link: "/patients", image: "/images/process.svg"},
    // {title: "Документооборот", link: "/cabinet", image: "/images/docs.svg"},
    // {title: "Задачи", link: "/cabinet", image: "/images/tasks.svg"},
    // {title: "Новости", link: "/cabinet", image: "/images/news.svg"},
    // {title: "Справочник", link: "/cabinet", image: "/images/spravochnik.svg"}
  ]

  const therapistData = [
    {title: "Кабинет", link: "/cabinet", image: "/images/profile.svg"},
    {title: "Библиотека", link: "/cabinet", image: "/images/library.svg"},
    {title: "Пациенты", link: "/patients", image: "/images/process.svg"},
  ]

  const adminData = [
    {title: "Кабинет", link: "/cabinet", image: "/images/profile.svg"},
    {title: "Пользователи", link: "/users", image: "/images/library.svg"},
    {title: "Пациенты", link: "/patients", image: "/images/process.svg"},
    {title: "Документооборот", link: "/cabinet", image: "/images/docs.svg"},
    {title: "Задачи", link: "/cabinet", image: "/images/tasks.svg"},
    {title: "Новости", link: "/cabinet", image: "/images/news.svg"},
    {title: "Справочник", link: "/cabinet", image: "/images/spravochnik.svg"}
  ]

  const renderDataByRole = () => {
    let data = [];

    if (auth.userRole == 4) {
      data = userData;
    } else if (auth.userRole == 2) {
      data = managerData;
    } else if (auth.userRole == 3) {
      data = adminData;
    } else if (auth.userRole == 1) {
      data = therapistData;
    }

    // return data.map((item, index) => <div key={index}>{item}</div>);
    return (
      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid xs="6" md="6" key={item.title}>
              <Card sx={{ width: 440, height: 180, display: 'flex', alignItems: 'center', p: 2, "borderRadius": "10px" ,"boxShadow": "0px 4px 35px 0px rgba(0, 0, 0, 0.08)"  }}>
                <CardContent>
                  <Typography variant="h5" component="div"> {item.title} </Typography>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(item.link)}>Открыть</Button>
                  </CardActions>
                </CardContent>
                <CardMedia component="img" sx={{ width: 200 }} image={item.image} />
              </Card>
            </Grid>
          ))
        }
        </Grid>
      </Box>
    )
  };

  return (
    renderDataByRole()
  )
};

export default Main;