export const requestOptionsUserInfo = () => {
    return {
        data: {
            "withCartItems": true,
            "withCartObject": true,
            "withCartLastMinute": true
        },
        headers: { "Content-Type": "application/json" }
    }
}