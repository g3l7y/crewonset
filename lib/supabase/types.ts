// Types mirroring the Supabase schema for the CrewOnset data layer.
// Tables: profiles, coin_transactions, contact_submissions.

export type PlayerStatus = "online" | "offline" | "flagged"

export interface Profile {
  id: string
  username: string
  email: string
  level: number
  coins: number
  activity: string | null
  last_active: string
  status: PlayerStatus
  is_admin: boolean
  created_at: string
}

export type PaymentGateway = "G-Cash" | "UnionBank" | "PayPal"
export type TransactionStatus = "pending" | "completed" | "failed" | "refunded"

export interface CoinTransaction {
  id: string
  user_id: string
  coins: number
  amount_php: number
  gateway: PaymentGateway
  status: TransactionStatus
  reference: string | null
  created_at: string
}

export type SubmissionType = "concern" | "brand_ad"
export type SubmissionStatus = "Pending" | "Approved" | "On-going" | "Done" | "Declined"

export interface ContactSubmission {
  id: string
  type: SubmissionType
  status: SubmissionStatus
  user_id: string | null
  full_name: string
  email: string
  // Concern-specific
  subject: string | null
  message: string | null
  // Brand-ad-specific
  brand_name: string | null
  product_model: string | null
  campaign_details: string | null
  budget_php: number | null
  created_at: string
  updated_at: string
}
