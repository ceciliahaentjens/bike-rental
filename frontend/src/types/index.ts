type PointOfSale = {
    id?: number,
    label?: string,
}

export type PointOfSaleLSType = {
    pointOfSale: PointOfSale | null,
    expire: string
}

export type Nullable<T> = T | null;