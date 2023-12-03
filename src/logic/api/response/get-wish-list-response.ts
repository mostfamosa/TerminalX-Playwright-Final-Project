export interface WishlistResponse {
    data: {
        anyWishlist: {
            items_count: number;
            sharing_code: string;
            updated_at: string;
            items: Array<{
                id: number;
                qty: number;
                last_in_stock_qty: number;
                product: {
                    sku: string;
                    __typename: string;
                    id: number;
                    visibility: string;
                    status: string;
                    early_cutoff: number;
                    justlanded: string;
                    stock_status2: string;
                    brand: string;
                    has_school: boolean;
                    use_qty: number;
                    brand_url: {
                        brand: number;
                        name: string;
                        url: string;
                    };
                    thumbnail: {
                        disabled: null;
                        label: string;
                        position: null;
                        url: string;
                    };
                    fragile_product: number;
                    description: {
                        html: string;
                    };
                    price_range: {
                        minimum_price: {
                            regular_price: {
                                value: number;
                                currency: string;
                            };
                            final_price: {
                                value: number;
                                currency: string;
                            };
                            discount: {
                                amount_off: number;
                                percent_off: number;
                            };
                        };
                    };
                };
            }>;
        };
    };
}
