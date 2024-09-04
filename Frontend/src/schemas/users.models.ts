export interface user {
    id: string
    username: string
    password?: string
    perm_assistance_areas?: string
    perm_users: number
    perm_assistance: number
    perm_productivity: number
    perm_employees: number
    perm_inventory: number
    perm_structure: number
    perm_it: number
    perm_materials: number
  }