export interface AdCampaign {
  id: string
  brand: string
  model: string
  productType: string
  clicks: number
  visits: number
  contract: string
  budget: string
  /** Hours from "now" until the campaign expires. */
  endsInHours: number
}

export const AD_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'ad-lumina-l900',
    brand: 'Lumina Lens',
    model: 'Lumina L-900 Pro',
    productType: 'Lens',
    clicks: 12840,
    visits: 4210,
    contract: 'CON-2026-0114',
    budget: '₱150,000',
    endsInHours: 146,
  },
  {
    id: 'ad-volt-bm7',
    brand: 'Volt Audio',
    model: 'Volt Boom Mic BM-7',
    productType: 'Equipment',
    clicks: 6120,
    visits: 1980,
    contract: 'CON-2026-0121',
    budget: '₱85,000',
    endsInHours: 742,
  },
]

export function getCampaign(id: string) {
  return AD_CAMPAIGNS.find((c) => c.id === id)
}
