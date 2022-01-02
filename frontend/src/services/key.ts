export const generateKey = (minL: number, maxL: number): string => {
    let output = '',
        dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    ;[...Array(Math.floor(Math.random() * maxL + minL)).keys()].forEach(() => {
        output += dict.charAt(Math.floor(Math.random() * dict.length))
    })
    return output
}
