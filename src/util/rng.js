export const RandomNum=()=>{
    const num=(Math.floor(Math.random() * 100))
    if (num%2==1) {
        return false;  
    }
    return true;
}
export const slotMachine =()=>{
    const num1=(Math.floor(Math.random() * 3))
    const num2=(Math.floor(Math.random() * 3))
    const num3=(Math.floor(Math.random() * 3))
    if (num1 == num2 && num2== num3) {
        console.log("Bingo");
        
    }
    return(`${num1},${num2},${num3}`);
    
}