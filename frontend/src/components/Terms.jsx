import React from 'react'
import { Card, CardContent } from './ui/card'
import MainLayout from './shared/MainLayout'

const Terms = () => {
    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <h1 className="text-3xl font-bold">Terms & Conditions</h1>

                        <div>
                            <h2 className="text-xl font-semibold">1. Acceptance</h2>
                            <p>By using JobLink, you agree to comply with these terms and all applicable laws.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">2. User Conduct</h2>
                            <p>Users must behave respectfully and lawfully. Fraud, harassment, or abuse is grounds for account suspension.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">3. Payments</h2>
                            <p>All payments must be processed via the platform. Disputes will follow our built-in resolution process.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">4. Termination</h2>
                            <p>We reserve the right to terminate accounts that violate our terms or harm our users.</p>
                        </div>

                        <p className="text-sm text-muted-foreground">For legal questions: legal@joblink.com</p>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}

export default Terms