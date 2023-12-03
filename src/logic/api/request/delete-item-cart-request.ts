export const requestOptionsDeleteItemCart = (itemId: number) => {
    return {
        data: {
            "cart_item_id": itemId,
            "skip_collect": 0,
            "withMultipass": false
        },
        headers: { "Content-Type": "application/json" }
    }
}