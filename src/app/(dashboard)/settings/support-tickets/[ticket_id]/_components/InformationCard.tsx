import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface InformationCardProps {
    title: string;
    children: ReactNode;
}

interface InformationRowProps {
    label: string;
    children: ReactNode;
}

export function InformationCard({ title, children }: InformationCardProps) {
    return (
        <Card className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="px-5 pb-3 pt-5">
                <h2 className="text-sm font-semibold text-app-primary">{title}</h2>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
                {children}
            </CardContent>
        </Card>
    );
}

export function InformationRow({ label, children }: InformationRowProps) {
    return (
        <div className="grid grid-cols-2 items-start gap-4">
            <p className="font-medium text-muted-foreground">{label}</p>
            <div className="min-w-0 wrap-break">{children}</div>
        </div>
    );
}
