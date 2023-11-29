export interface AddProductsToWishlistResponse {
    data: {
        addProductsToWishlist: {
            changed: number;
            anyWishlist: {
                items_count: number;
                items: Array<{
                    id: number;
                    product: {
                        sku: string;
                        stock_status2: string;
                        lastcall: string;
                        __typename: string;
                        id: number;
                        visibility: string;
                        status: string;
                        thumbnail: {
                            label: string;
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
                            maximum_price: {
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
    };
}

