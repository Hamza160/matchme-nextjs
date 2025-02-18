"use client"
import { registerUser } from "@/actions/authActions";
import { registerSchema, RegisterSchemaType } from "@/lib/schemas/RegisterSchema";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi"

const RegisterForm = () => {
    const {register, handleSubmit, reset, setError, formState:{errors, isValid, isSubmitting}} = useForm<RegisterSchemaType>({
        resolver:zodResolver(registerSchema), 
        mode:"onTouched",
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    });

    const onSubmit = async (data:RegisterSchemaType) => {
        const result = await registerUser(data);

        if(result.status === 'success'){
            console.log("User registered successfully!")
        }else{
            if(Array.isArray(result.error)){
                result.error.forEach(e => {
                    console.log("e::: ", e);
                    const fieldName = e.path.join(".") as | "name" | "email" | "password"
                    setError(fieldName, {
                        message: e.message
                    })
                })
            }else{
                setError("root.serverError", {
                    message: result.error
                })
            }
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-default-500">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30}/>
                        <h1 className="text-3xl font-semibold">
                            Register
                        </h1>
                    </div>
                    <p className="text-neutral-500">
                        Welcome back to MacthMe!
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            defaultValue=""
                            label="Name"
                            variant="bordered"
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={
                                errors.name?.message as string
                            }
                            />
                        <Input
                            defaultValue=""
                            label="Email"
                            variant="bordered"
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={
                                errors.email?.message as string
                            }
                            />
                        <Input
                            defaultValue=""
                            label="Password"
                            variant="bordered"
                            type="password"
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={
                                errors.password?.message as string
                            }
                        />
                        <Button
                            fullWidth
                            color="default"
                            type="submit"
                            isLoading={isSubmitting}
                            // isDisabled={!isValid}
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default RegisterForm;