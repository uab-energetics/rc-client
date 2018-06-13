import { User } from "../../auth/models/User"

export interface UserGroup {
    name: string
    users: User[]
}
