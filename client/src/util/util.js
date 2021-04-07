
export const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        return position.coords
    }, () => {
        return null
    })
}