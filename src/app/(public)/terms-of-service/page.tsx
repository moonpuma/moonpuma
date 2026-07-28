import type { Metadata } from "next";
import { LegalDocumentPage } from "@/shared/ui/legal-document-page/LegalDocumentPage";
import { TERMS_OF_SERVICE_CONTENT } from "@/shared/ui/legal-document-page/legal-content";

export const metadata: Metadata = {
    title: "Terms of Service",
};

export default function TermsOfServicePage() {
    return (
        <LegalDocumentPage
            title="Terms of Service"
            paragraphs={TERMS_OF_SERVICE_CONTENT}
            backHref="/sign-up"
            backTitle="Back to Sign Up"
        />
    );
}
