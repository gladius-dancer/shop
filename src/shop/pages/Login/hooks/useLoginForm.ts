import React, {useCallback} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoginType} from "../../../types/LoginType";
import {login} from "../../../store/reducers/ActionCreators";
import {useAppDispatch} from "../../../hooks/useRedux";

type FormData = LoginType

export function useLoginForm() {
    const dispatch = useAppDispatch()

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required().min(4),
    });

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<FormData>({resolver: yupResolver(schema)});

    const onSubmit = useCallback((formData: FormData)=> {
        dispatch(login(formData));
    },[])

    return {
        methods: {
          control
        },
        errors,
        onSubmit: handleSubmit(onSubmit)
    }
}

