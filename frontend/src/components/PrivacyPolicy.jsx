import React from 'react'
import { Card, CardContent } from './ui/card'
import MainLayout from './shared/MainLayout'

const PrivacyPolicy = () => {
    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h1 className="text-3xl font-bold">Privacy Policy</h1>

                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">1. What We Collect</h2>
                            <p>We collect your name, email, job-related preferences, and payment information to help provide our services.</p>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">2. How We Use It</h2>
                            <p>Your data helps us process jobs, improve your experience, and notify you of updates or changes.</p>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">3. Security</h2>
                            <p>We implement strong encryption and access control to keep your data safe and confidential.</p>
                        </div>

                        <p className="text-sm text-muted-foreground">For concerns, contact: privacy@joblink.com</p>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}

export default PrivacyPolicy