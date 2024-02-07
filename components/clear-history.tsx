'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
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
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { IconSpinner } from '@/components/ui/icons'

interface ClearHistoryProps {
  isEnabled: boolean
  clearChats: () => {}
}

export function ClearHistory({
  isEnabled = false,
  clearChats
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled={!isEnabled || isPending}>
          {isPending && <IconSpinner className="mr-2" />}
          Rensa historik
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
          <AlertDialogDescription>
            Detta raderar din chatthistorik permanent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Avbryt</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={event => {
              event.preventDefault()
              startTransition(() => {
                clearChats()
                setOpen(false)
                router.push('/')
              })
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Ta bort
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
