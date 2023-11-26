import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";
import { Navigate } from 'react-router-dom';


export type LoginDataType ={
    email: string,
    password: string,
    rememberMe: boolean,
}
type FormikErrorType = {
    email?: string,
    password?: string,
}
export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state)=> state.auth.isLoggedIn )
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 5) {
                errors.password = 'should be more three symbols ';
            }
            return errors

        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },

    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   id="email"
                                   name="email"
                                   type="email"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && <span style={{color: "red"}}>{formik.errors.email}</span>}
                        <TextField label="Password"
                                   margin="normal"
                                   id="password"
                                   name="password"
                                   type="password"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.password}

                        />
                        {formik.touched.password &&formik.errors.password && <span style={{color: "red"}}>{formik.errors.password}</span>}
                        <FormControlLabel label={'Remember me'} control={<Checkbox onChange={formik.handleChange}
                                                                                   value={formik.values.rememberMe}
                                                                                   name="rememberMe"/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}