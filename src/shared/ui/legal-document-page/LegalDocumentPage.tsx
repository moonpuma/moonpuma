import { BackLink } from "@/shared/ui/back-link";
import { Typography } from "@/shared/ui/typography";
import styles from "./LegalDocumentPage.module.scss";

export interface LegalDocumentPageProps {
    title: string;
    paragraphs: string[];
    // Куда ведёт ссылка «назад» и её текст — задаются страницей-потребителем,
    // чтобы компонент в shared/ui не знал о конкретных роутах (FSD: shared — domain-agnostic).
    backHref: string;
    backTitle: string;
}

export function LegalDocumentPage({
                                      title,
                                      paragraphs,
                                      backHref,
                                      backTitle,
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