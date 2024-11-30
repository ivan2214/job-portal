'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function ApplicationActions({ applicationId, currentStatus }: { applicationId: string; currentStatus: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<'accept' | 'reject' | 'request-info' | null>(null)

  const handleAction = (action: 'accept' | 'reject' | 'request-info') => {
    setActionType(action)
    setIsDialogOpen(true)
  }

  const confirmAction = async () => {
    // Here you would typically make an API call to update the application status
    console.log(`Confirmed action: ${actionType} for application ${applicationId}`)
    setIsDialogOpen(false)
    // You might want to refresh the page or update the UI here
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={() => handleAction('accept')}
        className="w-full"
        variant="default"
        disabled={currentStatus === 'Accepted'}
      >
        Accept Application
      </Button>
      <Button
        onClick={() => handleAction('reject')}
        className="w-full"
        variant="destructive"
        disabled={currentStatus === 'Rejected'}
      >
        Reject Application
      </Button>
      <Button
        onClick={() => handleAction('request-info')}
        className="w-full"
        variant="outline"
      >
        Request More Information
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'accept' && "Are you sure you want to accept this application?"}
              {actionType === 'reject' && "Are you sure you want to reject this application?"}
              {actionType === 'request-info' && "Are you sure you want to request more information?"}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

