L = [
    {id:6511234,name:'Jack',salary:10000},
    {id:6511235,name:'Mike',salary:15000},
    {id:6511236,name:'Nancy',salary:20000},
    {id:6511237,name:'Alice',salary:30000},
]

L = L.map((x) => {return {...x, salary: x.salary*1.1}})

console.log(L)