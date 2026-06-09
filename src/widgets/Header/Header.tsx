"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import s from "./Header.module.scss";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import { Select, SelectOption } from "@/shared/ui/Select";

import bellIcon from "@/shared/ui/icons/common/bell-outline.svg";
import ukFlagIcon from "@/shared/ui/icons/locale/flag-united-kingdom.svg";
import ruFlagIcon from "@/shared/ui/icons/locale/flag-russia.svg";

interface HeaderProps {
    isLoggedIn?: boolean;
    className?: string;
    onLoginClick?: () => void;
    onSignupClick?: () => void;
}

const languageOptions: SelectOption[] = [
    { value: "en", label: "English", icon: ukFlagIcon },
    { value: "ru", label: "Русский", icon: ruFlagIcon },
];

export const Header = ({
                           isLoggedIn = false,
                           className,
                           onLoginClick = () => {},
                           onSignupClick = () => {},
                       }: HeaderProps) => {
    const [lang, setLang] = useState<"en" | "ru">("en");

    const handleLanguageChange = (value: string) => {
        setLang(value as "en" | "ru");
    };

    return (
        <header className={clsx(s.headerWrapper, className)}>
            <div className={s.headerContainer}>
                <Link href="/" className={s.logoLink}>
                    <Typography variant="h1" className={s.logo}>
                        Inctagram
                    </Typography>
                </Link>

                <div className={s.actionsBlock}>
                    <Select
                        options={languageOptions}
                        value={lang}
                        onChange={handleLanguageChange}
                    />

                    {isLoggedIn ? (
                        <button className={s.bellButton} aria-label="Notifications">
                            <Image src={bellIcon} alt="Notifications" className={s.bellIcon} />
                            <span className={s.notificationBadge}>3</span>
                        </button>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                onClick={onLoginClick}
                                className={s.loginBtn}
                                title="Log in"
                            />
                            <Button
                                variant="filled"
                                onClick={onSignupClick}
                                className={s.signupBtn}
                                title="Sign up"
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
