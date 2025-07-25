import React from 'react'
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import MainLayout from './shared/MainLayout'

const FAQ = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
                <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="q1" className="border-b">
                        <h3 className="text-lg font-medium">How do I create an account?</h3>
                        <p className="text-muted-foreground">Click “Sign Up” and follow the instructions to register as a freelancer or client.</p>
                    </AccordionItem>
                    <AccordionItem value="q2" className="border-b">
                        <h3 className="text-lg font-medium">Is it free to use JobLink?</h3>
                        <p className="text-muted-foreground">Yes! Signing up and browsing jobs is free. We only charge a small service fee on completed transactions.</p>
                    </AccordionItem>
                    <AccordionItem value="q3">
                        <h3 className="text-lg font-medium">How do I post a job?</h3>
                        <p className="text-muted-foreground">Clients can click “Post Job” in their dashboard and fill out the required fields.</p>
                    </AccordionItem>
                </Accordion>
            </div>
        </MainLayout>
    )
}

export default FAQ