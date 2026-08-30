import { notFound } from 'next/navigation'
import { getCampaign } from '@/components/admin/ad-data'
import { RevenueDetail } from '@/components/admin/revenue-detail'

export default async function AdRevenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const campaign = getCampaign(id)
  if (!campaign) notFound()
  return <RevenueDetail campaign={campaign} />
}
