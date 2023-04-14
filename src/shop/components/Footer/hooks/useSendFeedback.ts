import React, { useCallback, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { FeedbackType } from "../../../../types/FeedbackType";
import { sendFeedback } from "../../../../store/reducers/AsyncActions";
import { useAppDispatch } from "../../../hooks/useRedux";

type FormData = FeedbackType;

export function useFeedbackForm() {
    const dispatch = useAppDispatch();

    const schema = yup.object().shape({
        name: yup.string().required(),
        number: yup.string().required(),
        start: yup.string().required(),
        end: yup.string().required(),
        message: yup.string().required(),

    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    const onSubmit = useCallback((formData: FormData) => {
        dispatch(sendFeedback(formData));
    }, []);

    return {
        methods: {
            control,
        },
        errors,
        onSubmit: handleSubmit(onSubmit),
    };
}
