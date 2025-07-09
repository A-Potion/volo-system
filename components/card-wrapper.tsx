import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card'
import Link from 'next/link'

const CardWrapper = ({
    children,
    cardTitle,
    cardDescription,
    cardFooterLinkTitle,
    cardFooterDescription,
    cardFooterLink,
    className = '',
} : CardWrapperType) => {
    return (
        <Card className={`w-[400px] relative ${className}`}>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {cardFooterLink && (
                <CardFooter className="flex items-center justify-center gap-x-1">
                    {cardFooterDescription && <span>{cardFooterDescription}</span>}
                <Link href={cardFooterLink} className="underline text-blue-500 hover:text-blue-700">
                {cardFooterLinkTitle}
                </Link>
                </CardFooter>
            )}
        </Card>
    )
}

export default CardWrapper;