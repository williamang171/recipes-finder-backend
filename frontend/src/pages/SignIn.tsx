import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import useAuth from 'hooks/useHttpAPI/useAuth';
import Alert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import yupSchema from 'yup-schema-common';

type FormData = {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yupSchema.email,
    password: yup.string().required()
}).required();

export default function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        login({
            username: data.email,
            password: data.password
        }, () => {
            navigate("/finder")
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Alert
                    severity="info"
                    sx={{ mt: 4, mb: 1 }}
                >
                    You can log in as a demo user with <b>demo@example.com
                    </b> as the email and <b>password123&</b> as the password
                </Alert>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required"
                        }}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField sx={{ mb: 2 }} fullWidth label="Email Address" {...field} error={errors.email ? true : false} helperText={errors.email ? errors.email.message : null} />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (<TextField type="password" fullWidth label="Password" {...field}
                            error={errors.password ? true : false} helperText={errors.password ? errors.password.message : null}
                        />)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link to="/auth/sign-up" component={RouterLink}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}