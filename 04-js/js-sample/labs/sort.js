L = [6,7,4,10,3,8,1,9,5,2]

for(let i=0; i<L.length; i++) {{
    for(let j=0; j<L.length; j++) {
        if(L[i] < L[j]) {
            let temp = L[i]
            L[i] = L[j]
            L[j] = temp
        }
    }
}
}


console.log(L)