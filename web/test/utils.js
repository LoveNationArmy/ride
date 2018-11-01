export const sleep = (n = 0) => new Promise(resolve => setTimeout(resolve, n))
export const callback = fn => new Promise((resolve, reject) => fn(err => err ? reject(err) : resolve()))
