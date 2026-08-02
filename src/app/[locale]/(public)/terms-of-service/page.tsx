import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocumentPage } from "@/shared/ui/legal-document-page/LegalDocumentPage";
import { TERMS_OF_SERVICE_CONTENT } from "@/shared/ui/legal-document-page/legal-content";
import { routes } from "@/shared/routing/routes";

export const metadata: Metadata = {
    title: "Terms of Service",
};

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <LegalDocumentPage
            title="Terms of Service"
            paragraphs={TERMS_OF_SERVICE_CONTENT}
            backHref={routes.auth.signUp()}
            backTitle="Back to Sign Up"
        />
    );
}
