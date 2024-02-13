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
import { setLoggingAccepted } from '@/app/actions'
import { Checkbox } from './checkbox'

function CheckboxWithText({
  onChange,
  value
}: {
  onChange: () => void
  value: boolean
}) {
  return (
    <div className="items-top flex space-x-2 mt-8">
      <Checkbox id="terms1" onCheckedChange={onChange} checked={value} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Jag går med på att mina chatmeddelanden loggas
        </label>
      </div>
    </div>
  )
}

export function AcceptLogging() {
  const [checked, setChecked] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <AlertDialog open>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled={!checked || isPending}>
          {isPending && <IconSpinner className="mr-2" />}
          Fortsätt
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Innan du använder VasaGPT</AlertDialogTitle>
          <AlertDialogDescription>
            När du chattar med VasaGPT så loggas varje meddelande, genom att
            fortsätta går du med att att dina chatmeddelanden loggas.
            <CheckboxWithText
              onChange={() => setChecked(!checked)}
              value={checked}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            disabled={isPending || !checked}
            onClick={event => {
              event.preventDefault()
              startTransition(() => {
                setLoggingAccepted()
                router.refresh()
                router.refresh()
              })
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Börja chatta
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
