import type { PropsWithChildren } from "react";
import Link from "next/link";
import { KoreanStrings } from "@/core/localization/KoreanStrings";
import { GlobalDesign } from "@/design/GlobalDesign.global";

export function AppShell(Props: PropsWithChildren)
{
    return (
        <div className="app-shell">
            <GlobalDesign />
            <header className="app-header">
                <Link href="/" className="brand-mark" aria-label={KoreanStrings.AppName}>
                    <span className="brand-icon">BA</span>
                    <span>{KoreanStrings.AppName}</span>
                </Link>
                <span className="header-tagline">{KoreanStrings.AppTagline}</span>
            </header>
            {Props.children}
            <div className="ambient ambient-one" aria-hidden="true" />
            <div className="ambient ambient-two" aria-hidden="true" />
        </div>
    );
}
