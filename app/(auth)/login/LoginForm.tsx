"use client"
import { loginSchema, LoginSchemaType } from "@/lib/schemas/LoginSchema";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi"

const LoginForm = () => {
    const {register, handleSubmit, formState:{errors, isValid}} = useForm<LoginSchemaType>({resolver:zodResolver(loginSchema), 
        defaultValues:{
            email:"",
            password:""
        }
    });

    const onSubmit = (data:LoginSchemaType) => {
        console.log(data)
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-default-50">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30}/>
                        <h1 className="text-3xl font-semibold">
                            Login
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
                            isDisabled={!isValid}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default LoginForm