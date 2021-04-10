const { getField, login, fire, getScore } = require("./utils")

const link = "http://192.168.1.5:8080/" //router 
//http://192.168.1.33:8080/" wifi
//http://93.42.249.207:8080/ giovanni
const team = "Zemo"
const password = "hydra"

const checkright = (field, x, y) => {
  let counter=1 //controllo a dx
  const W =  field[0].length
  while (x+counter<W){ 
  if(field[y][x+counter].hit){
    if(field[y][x+counter].ship){
    counter++
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
        counter--
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
    counter++
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
      counter--
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
    let { field } = await getField(link)
      const W = await field[0].length
      const H = await field.length
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
              cr=checkright(await field,x,y)
              if(cr){
                x+=cr
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])
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
              cl=checkleft(await field,x,y)
              if(cl){
                x+=cl
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])
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
              cd=checkdown(await field,x,y)
              if(cd){
                y+=cd
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])

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
              cu=checkup(await field,x,y)
              if(cu){
                y+=cu
                console.log("imma shooting in y=",y, ", x=",x)
                c=await fire(link, x, y, team, password)
                if (c===400) {
                  console.log("gioco finito")
                  break
                }
                fakefield=rm(fakefield,[y,x])
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

