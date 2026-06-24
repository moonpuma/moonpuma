import type { Metadata } from "next";
import { LegalDocumentPage } from "@/shared/ui/legal-document-page/LegalDocumentPage";
import { PRIVACY_POLICY_CONTENT } from "@/shared/ui/legal-document-page/legal-content";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
    return (
        <LegalDocumentPage
            title="Privacy Policy"
            paragraphs={PRIVACY_POLICY_CONTENT}
        />
    );
}
