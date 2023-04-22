import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {ProductType} from "../../../../../types/ProductType";
import * as yup from "yup";

type FormData = ProductType;

const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    count: yup.number().required(),
    discount: yup.number().required(),
    category: yup.string().required(),
    image: yup.string().required(),
});

export function useProductModalForm(data?: ProductType) {
    const {
        handleSubmit,
        control,
    } = useForm<FormData>({ resolver: yupResolver(schema), defaultValues: {...data } });

    const onSubmit = async (data: any) => {
        console.log(data)
    };


    return {
        methods: {
            control
        },
        onSubmit: handleSubmit(onSubmit)
    }
}