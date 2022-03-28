export interface Position {
    x: number
    y: number
}

export interface Size {
    height: number
    width: number
}

export interface Table {
    id: number;
    uuid: string;
    shape: string;
    label: string;
    chairs: number;
    position: Position;
    size: Size
}

export interface Layout {
    id: number;
    name: string;
    tables: Table[]
    rawData: string;
    created_at: string;
    updated_at: string;
}

export interface Restaurant {
    id: number;
    name: string;
    address: string;
    description: string;
    opening_hours: string;
    telephone_number: string;
    reservation_advance_hours: number;
    type: string;
    primary_table_view?: string;
    table_views: Layout[];
    created_at: string;
    updated_at: string;
}

// NEW ITEMS

export interface TableNew {
    uuid: string
    label: string
    shape: 'square'|'circle'
    position: Position
    size: Size
    chairs: number
}

export interface LayoutNew {
    id: string;
    name: string
    tables: TableNew[]
}

export interface Reservation {
    id: number;
    from: string;
    to: string;
    duration: number;
    price: number;
    user: Record<string, any>;
    restaurantTable?: any;
    note: string;
    restaurant: Restaurant;
}
