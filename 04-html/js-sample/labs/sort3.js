L = [
    {id:6511234,name:'Jack'},
    {id:6511235,name:'Mike'},
    {id:6511236,name:'Nancy'},
    {id:6511237,name:'Alice'},
]

L.sort((a,b) => a.name.localeCompare(b.name))


console.log(L)
console.log('Jack'<'Mike')