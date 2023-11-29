export const requestOptionsAddToMyList = (itemId: string) => {
    return {
        data: { "id": [itemId] },
        headers: {"Content-Type": "application/json"}
    }
}