import { Access } from "./access"

export interface User {
    name: string
    email: string
    password: string
    access: Access
}