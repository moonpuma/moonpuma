import s from "./SearchInput.module.scss"

type Props = {
    placeholder?: string;
    error?: string | undefined;
}

export const SearchInput = ({
                                placeholder,
                                error
                            }: Props) => {

    const inputClassName = `${s.input} ${error ? s.inputError : ''}`;

    return (
        <div className={s.inputWrapper}>
            <div className={s.inputContainer}>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={inputClassName}
                />
                <button type="button" className={s.searchButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 15.5L19 19M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#8D9094" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
            {error && <span className={s.errorText}>{error}</span>}
        </div>
    );
};