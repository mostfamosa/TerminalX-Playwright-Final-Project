export const requestOptionsAddToMyList = (itemId: number) => {
    return {
        data: { "id": [itemId] },
        headers: {"Content-Type": "application/json"}
    }
}