import React from "react";
import { ReactNode } from "react";

interface SocialProps {
    url: string;
    children: ReactNode
}

export function Social({ url, children }: SocialProps) {
    return (
        <a
            href={url}
            rel="noopener norefeer"
            target="_blank"
        >
            {children}
        </a>
    )
}