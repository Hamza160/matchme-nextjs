"use client"
import { signInUser } from "@/actions/authActions";
import { loginSchema, LoginSchemaType } from "@/lib/schemas/LoginSchema";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi"
import { toast } from "react-toastify";

const LoginForm = () => {
    const router = useRouter()

    const {register, handleSubmit, formState:{errors, isValid, isSubmitting}} = useForm<LoginSchemaType>({resolver:zodResolver(loginSchema), 
        defaultValues:{
            email:"",
            password:""
        }
    });
    const onSubmit = async (data:LoginSchemaType) => {
        const result = await signInUser(data)
        if(result.status === 'success'){
            router.push('/members')
        }else{
            toast.error(result.error as string)
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-default-500">
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
                            isLoading={isSubmitting}
                            color="default"
                            type="submit"
                            // isDisabled={!isValid}
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