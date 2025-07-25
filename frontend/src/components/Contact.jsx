import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import MainLayout from './shared/MainLayout'

const Contact = () => {
    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto py-10 px-4">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h1 className="text-3xl font-bold">Contact Us</h1>
                        <p>We’d love to hear from you! Reach us via any of the methods below:</p>
                        <ul className="space-y-2 text-base">
                            <li><strong>Email:</strong> support@joblink.com</li>
                            <li><strong>Phone:</strong> +254 712 345 678</li>
                            <li><strong>Location:</strong> Nairobi, Kenya</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">Typical response time: 1–2 business days.</p>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}

export default Contact