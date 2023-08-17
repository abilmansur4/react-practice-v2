import axios from "axios";
import { useState } from 'react';
import { Stack, Box, Container, Button, TextField } from "@mui/material";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/auth/reset-password", { email: email})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  }

  return (
    <>
      <Container 
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"  
      }}
    >
      
      <Box sx={{ width: 300}}>
        <Stack spacing={2}>
          <TextField label="Email" value={email} variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Восстановить пароль</Button>
        </Stack>
      </Box>
    </Container>
    </>
  )
};

export default ForgotPassword;