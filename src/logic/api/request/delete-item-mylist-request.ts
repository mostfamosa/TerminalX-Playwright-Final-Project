export const requestOptionsDeleteItem = (itemId: number) => {
    return {
        data: {
            "id": itemId
        },
        headers: { "Content-Type": "application/json" }
    }
}