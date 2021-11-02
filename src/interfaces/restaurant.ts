export interface Restaurant {
    id: number;
    name: string;
    address: string;
    description: string;
    opening_hours: string;
    telephone_number: string;
    reservation_advance_hours: number;
    type: string;
    primary_table?: string;
    table_views: any[];
    created_at: Date;
    updated_at: Date;
}
