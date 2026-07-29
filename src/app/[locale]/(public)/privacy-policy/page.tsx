import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocumentPage } from "@/shared/ui/legal-document-page/LegalDocumentPage";
import { PRIVACY_POLICY_CONTENT } from "@/shared/ui/legal-document-page/legal-content";
import { routes } from "@/shared/routing/routes";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <LegalDocumentPage
            title="Privacy Policy"
            paragraphs={PRIVACY_POLICY_CONTENT}
            backHref={routes.auth.signUp()}
            backTitle="Back to Sign Up"
        />
    );
}
