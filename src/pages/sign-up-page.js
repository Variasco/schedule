import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../api";
import { useState } from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Box,
    Typography,
    Container,
    Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const SignUpPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const onSubmit = (e, email, password) => {
        e.preventDefault();
        createUserWithEmailAndPassword(getAuth(firebaseApp), email, password);
    };

    const inputHandler = (e) => {
        e.preventDefault();

        const field = e.target.getAttribute("name");

        setForm({
            ...form,
            [field]: e.target.value,
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={inputHandler}
                        value={form.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={inputHandler}
                        value={form.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => {
                            onSubmit(e, form.email, form.password);
                        }}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                {"Уже есть аккаунт? Войди"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
