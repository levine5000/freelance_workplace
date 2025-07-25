import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import MainLayout from './shared/MainLayout'

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">About JobLink</h1>
            <p>
              JobLink is a modern freelance workplace platform connecting talented freelancers with clients globally.
              We believe in transparent, fair, and impactful work opportunities for everyone.
            </p>
            <p>
              Our goal is to empower people with access to meaningful work, support businesses with reliable talent,
              and shape the future of digital collaboration.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

export default AboutPage