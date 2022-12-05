export const generateIdImage = (url)=>{
    const link = url?.split('/')
    // ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1", ""]
    const index = link?.length?link?.length-2:null
    return index?link[index]:null
}
export const getLinkImage = (id)=>{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
}
