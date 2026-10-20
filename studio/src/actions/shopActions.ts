import {useEffect, useState} from 'react'
import {CheckmarkCircleIcon, PackageIcon} from '@sanity/icons'
import {useDocumentOperation, type DocumentActionComponent, type DocumentActionsResolver} from 'sanity'

type StatusDoc = {status?: string}

// Patches the document and publishes it in one click (orders and vouchers are created as
// published documents by the Stripe webhook, so editors never need to see a draft).
function createSetAndPublishAction(options: {
  label: string
  doneStatus: string
  icon: typeof PackageIcon
  patch: () => Record<string, unknown>
}): DocumentActionComponent {
  const action: DocumentActionComponent = (props) => {
    const {patch, publish} = useDocumentOperation(props.id, props.type)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
      if (isSaving && !props.draft) setIsSaving(false)
    }, [isSaving, props.draft])

    const doc = (props.draft || props.published) as StatusDoc | null
    if (doc?.status === options.doneStatus) return null

    return {
      label: isSaving ? 'Ukládám…' : options.label,
      icon: options.icon,
      tone: 'positive',
      disabled: isSaving,
      onHandle: () => {
        setIsSaving(true)
        patch.execute([{set: options.patch()}])
        publish.execute()
        props.onComplete()
      },
    }
  }
  return action
}

export const markOrderShipped = createSetAndPublishAction({
  label: 'Označit jako odesláno',
  doneStatus: 'shipped',
  icon: PackageIcon,
  patch: () => ({status: 'shipped', shippedAt: new Date().toISOString()}),
})

export const markVoucherRedeemed = createSetAndPublishAction({
  label: 'Označit jako uplatněný',
  doneStatus: 'redeemed',
  icon: CheckmarkCircleIcon,
  patch: () => ({status: 'redeemed', redeemedAt: new Date().toISOString()}),
})

export const shopDocumentActions: DocumentActionsResolver = (prev, context) => {
  if (context.schemaType === 'order') return [markOrderShipped, ...prev]
  if (context.schemaType === 'voucher') return [markVoucherRedeemed, ...prev]
  return prev
}
