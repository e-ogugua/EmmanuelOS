export type Role = 'admin' | 'staff'

export interface Profile {
  id: string
  full_name: string
  role: Role
  phone?: string
  bio?: string
  created_at: string
}
