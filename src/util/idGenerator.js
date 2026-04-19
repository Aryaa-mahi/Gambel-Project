import { v4 as uuidv4 } from "uuid";

export const uid_generator=()=>{
    return `User_${uuidv4().split('').slice(0,5).join('')}`
}
export const oid_generator=()=>{
    return `Owner_${uuidv4().split('').slice(0,5).join('')}`
}
export const iid_generator=()=>{
    return `Investment_${uuidv4().split('').slice(0,5).join('')}`
}
export const gid_generator=()=>{
    return `Gamble_${uuidv4().split('').slice(0,5).join('')}`
}
export const pid_generator=()=>{
    return `Payment_${uuidv4().split('').slice(0,5).join('')}`
}