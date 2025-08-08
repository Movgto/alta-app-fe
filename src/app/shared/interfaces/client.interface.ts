export interface Client {
    id: number
    company_name: string
    rfc: string
    representative_name: string
    email: string
    phone_number: string
    document: {
        mimetype: string
        filename: string
        data: string // Base64 string for HTTP transmission
    }
}