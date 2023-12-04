export interface CurrentUserInfoResponse {
    data: {
        currentUserInfo: {
            cart_object: {
                id: string;
                email: string;
                max_dc_points: number;
                items: Array<{
                    id: string;
                    product: {
                        sku: string;
                        id: number;
                        visibility: string;
                        status: string;
                        early_cutoff: number;
                        justlanded: string;
                        stock_status2: string;
                        stampa_sale: number;
                        stampa_strip: number;
                        brand: string;
                        has_school: boolean;
                        use_qty: number;
                        brand_url: {
                            brand: number;
                            name: string;
                            url: string;
                        };
                        div_top: string;
                        div_top_code: string;
                        div: string;
                        div_code: string;
                        type: string;
                        fabric: string;
                        thumbnail: {
                            label: string;
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
                    configurable_options: Array<{
                        id: number;
                        option_label: string;
                        value_id: number;
                        value_label: string;
                    }>;
                    quantity: number;
                    prices: {
                        price: {
                            currency: string;
                            value: number;
                        };
                        row_total: {
                            currency: string;
                            value: number;
                        };
                    };
                }>;
                minicart_subtotal: number;
            };
        };
    };
}

