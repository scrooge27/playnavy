const { getField, login, fire, getScore } = require("./utils")

const link = "http://192.168.1.12:8080/" //http://93.42.249.207:8080/
const team = "Zemo"
const password = "hydra"

const checkright = (field, x, y) => {
  let counter=1 //controllo a dx
  const W =  field[0].length
  while (x+counter<W){ 
  if(field[y][x+counter].hit){
    if(field[y][x+counter].ship){
    if(field[y][x+counter].ship.id===field[y][x].ship.id){
      counter++
    }
    else{
      //altra nave ALREADY HIT
      return null
    }
  }
  else{
    //cella vuota ALREADY HIT
    return null
  }
  }
  else{
    return counter
  }
  }
  return null
}
const checkleft = (field, x, y) => {
  let counter=-1 //controllo a sx
  while (x+counter>=0){
    if(field[y][x+counter].hit){
      if(field[y][x+counter].ship){
      if(field[y][x+counter].ship.id===field[y][x].ship.id){
        counter--
      }
      else{
        //altra nave ALREADY HIT
        return null
      }
    }
    else{
      //cella vuota ALREADY HIT
      return null
    }
    }
    else{
      return counter
    }
    }
  return null
}

const checkdown = (field, x, y) => {
  let counter=1 //controllo in basso
  const H =  field.length
  while (y+counter<H){ 
  if(field[y+counter][x].hit){
    if(field[y+counter][x].ship){
    if(field[y+counter][x].ship.id===field[y][x].ship.id){
      counter++
    }
    else{
      //altra nave ALREADY HIT
      return null
    }
  }
  else{
    //cella vuota ALREADY HIT
    return null
  }
  }
  else{
    return counter
  }
  }
  return null
}
const checkup = (field, x, y) => {
  let counter=-1 //controllo in alto
  while (y+counter>=0){
    if(field[y+counter][x].hit){
      if(field[y+counter][x].ship){
      if(field[y+counter][x].ship.id===field[y][x].ship.id){
        counter--
      }
      else{
        //altra nave ALREADY HIT
        return null
      }
    }
    else{
      //cella vuota ALREADY HIT
      return null
    }
    }
    else{
      return counter
    }
    }
    return null
}

const rnd = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

function array_equals(a, b){
  return a.length === b.length && a.every((item,idx) => item === b[idx])
}

const rm = (arr,tag) => {
  return arr.filter(item => !array_equals(item, tag))
}

let c=" "

const main = async() => {
  try {
    login(link, team, password)
    let { field:f } = await getField(link)
      const W = await f[0].length
      const H = await f.length
      let fakefield=[]
      for(let i=0;i<H;i++){
        for(let j=0;j<W;j++){
          let cella=[i,j]
          fakefield.push(cella)
        }
      }
      let coords = rnd(fakefield)
      let x = coords[1]
      let y = coords[0]
    while (true) {
      let { field } = await getField(link)  
      let cell = await field[y][x]
      const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
      await waitFor(0);
      if(!cell.hit){
        console.log("imma shooting in y=",y, ", x=",x)
        c=await fire(link, x, y, team, password)
        if (c===400) {
          console.log("gioco finito")
          break
        }
        fakefield=rm(fakefield,[y,x])
        console.log(fakefield.length)
        console.log(c.message)
      }

      else if(cell.hit){
        if(cell.ship){
          if(cell.ship.alive){
            let cr=checkright(await field,x,y)
            let cd=checkdown(await field,x,y)
            let cl=checkleft(await field,x,y)
            let cu=checkup(await field,x,y)
            let savex=x
            let savey=y
            let m=" "
            do{
              let { field } = await getField(link)  
              cr=checkright(await field,x,y)
              if(cr){
                console.log("la nave che hai beccato è ", field[y][x].ship.name)
                x+=cr
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])
                console.log(fakefield.length)
                console.log(c.message)
                m=c.message
                const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
                await waitFor(0);
              }
              else{
                break
              }
            }while(m!=="WATER")
            x=savex
            do{
              let { field } = await getField(link)  
              cl=checkleft(await field,x,y)
              if(cl){
                console.log("la nave che hai beccato è ",field[y][x].ship.name)
                x+=cl
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])
                console.log(fakefield.length)
                console.log(c.message)
                m=c.message
                const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
                await waitFor(0);
              }
              else{
                break
              }
            }while(m!=="WATER")
            x=savex
            y=savey 
            do{
              let { field } = await getField(link)  
              cd=checkdown(await field,x,y)
              if(cd){
                console.log("la nave che hai beccato è ",field[y][x].ship.name)
                y+=cd
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])
                console.log(fakefield.length)
                console.log(c.message)
                m=c.message
                const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
                await waitFor(0);
              }
              else{
                break
              }
            }while(m!=="WATER")
            y=savey
            do{
              let { field } = await getField(link)  
              cu=checkup(await field,x,y)
              if(cu){
                console.log("la nave che hai beccato è ",field[y][x].ship.name)
                y+=cu
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])
                console.log(fakefield.length)
                console.log(c.message)
                m=c.message
                const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
                await waitFor(0);
              }
              else{
                break
              }
            }while(m!=="WATER")
            }

            
            else{
              coords = rnd(fakefield)
              x = coords[1]
              y = coords[0]
            }
          }
          else{
            coords = rnd(fakefield)
            x = coords[1]
            y = coords[0]
         }
      }
    }
    } catch (err) {
    console.log(err)
  }
}
main()

//esempio 
/*function array_equals(a, b){
  return a.length === b.length && a.every((item,idx) => item === b[idx])
}

const rm = (arr,tag) => {
  return arr.filter(item => !array_equals(item, tag))
}

const H=5
const W=5
let fakefield=[]
for(let i=0;i<H;i++){
  for(let j=0;j<W;j++){
    let cella=[i,j]
    fakefield.push(cella)
  }
}
console.log("array iniziale", fakefield, "di lunghezza ", fakefield.length)
fakefield= rm(fakefield,[0,0])
console.log("array iniziale", fakefield, "di lunghezza ", fakefield.length)*/
