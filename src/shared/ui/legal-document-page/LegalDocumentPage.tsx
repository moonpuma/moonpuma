import { BackLink } from "@/shared/ui/back-link";
import { Typography } from "@/shared/ui/typography";
import styles from "./LegalDocumentPage.module.scss";

export interface LegalDocumentPageProps {
    title: string;
    paragraphs: string[];
    backHref?: string;
    backTitle?: string;
}

export function LegalDocumentPage({
                                      title,
                                      paragraphs,
                                      backHref = "/sign-up",
                                      backTitle = "Back to Sign Up",
                                  }: LegalDocumentPageProps) {
    return (
        <div className={styles.wrapper}>
            <BackLink href={backHref} title={backTitle} />

            <Typography variant="h1" className={styles.title}>
                {title}
            </Typography>

            <div className={styles.content}>
                {paragraphs.map((paragraph, index) => (
                    <Typography
                        key={index}
                        variant="regular_text_16"
                        className={styles.paragraph}
                    >
                        {paragraph}
                    </Typography>
                ))}
            </div>
        </div>
    );
}