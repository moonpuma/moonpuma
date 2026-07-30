"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@/shared/ui/icon";
import { Link, useRouter } from "@/shared/i18n/navigation";
import { routes } from "@/shared/routing/routes";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/cards";
import GoogleIcon from "@/shared/ui/icon/icons/social/google.svg";
import GithubIcon from "@/shared/ui/icon/icons/social/github.svg";
import s from "./SignInForm.module.scss";

interface SignInFormValues {
    email: string;
    password: string;
}

export function SignInForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormValues) => {
        try {
            // TODO: заменить на реальный API-запрос через TanStack Query
            console.log("Sign in data:", data);
            router.push(routes.home());
        } catch {
            setError("password", {
                message: "The email or password are incorrect. Try again please",
            });
        }
    };

    const handleGoogleSignIn = () => {
        // TODO: подключить OAuth через Google
        console.log("Google sign in");
    };

    const handleGithubSignIn = () => {
        // TODO: подключить OAuth через GitHub
        console.log("GitHub sign in");
    };

    return (
        <Card className={s.card}>
            <Typography variant="h1" className={s.title}>
                Sign In
            </Typography>

            {/* OAuth-кнопки */}
            <div className={s.oauthButtons}>
                <button
                    type="button"
                    className={s.oauthBtn}
                    onClick={handleGoogleSignIn}
                    aria-label="Sign in with Google"
                >
                    <Icon icon={GoogleIcon} size={36} />
                </button>
                <button
                    type="button"
                    className={s.oauthBtn}
                    onClick={handleGithubSignIn}
                    aria-label="Sign in with GitHub"
                >
                    <Icon icon={GithubIcon} size={36} color="var(--color-light-100)" />
                </button>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Epam@epam.com"
                    error={errors.email?.message}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                />

                <Input
                    label="Password"
                    type="password"
                    showPasswordToggle
                    placeholder="******************"
                    error={errors.password?.message}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />

                <Link href={routes.auth.forgotPassword()} className={s.forgotPassword}>
                    <Typography variant="regular_text_14">
                        Forgot Password
                    </Typography>
                </Link>

                <Button type="submit" disabled={isSubmitting} className={s.submitButton}>
                    Sign In
                </Button>
            </form>

            {/* Ссылка на регистрацию */}
            <div className={s.footer}>
                <Typography variant="regular_text_16">
                    Don&apos;t have an account?
                </Typography>
                <Typography variant="regular_link" href={routes.auth.signUp()}>
                    Sign Up
                </Typography>
            </div>
        </Card>
    );
}
