import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
// https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10
export const getPokemon = createAsyncThunk('pokemon/getPokemon', async(arg,{getState,dispatch})=>{
    dispatch(nextPage())
    const {page,data,limit,offset} = getState().pokemon
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then(doc=>doc.json())
    //1 => 10
    //2 => 10
    // prev data ke new data
    if(page==1) return res
    return {results:data.concat(await res?.results)}
})

export const getAbility = createAsyncThunk('pokemon/getAbility',async(url)=>{
    const res = await fetch(url).then(docs=>docs.json())
    return res
})

export const pokemon = createSlice({
    name:'pokemon',
    initialState:{
        data:[],
        page:0,
        limit:10,
        offset:0,
        loading:false,
        error:null,
        ability:{}
    },
    reducers:{
        nextPage: state=>{
            state.page=state.page+1,
            state.offset=state.page>1?state.page*state.limit:0
        }
    },
    extraReducers: builder=>{
        builder
        .addCase(getPokemon.pending, state=>{
            state.loading=true
        })
        .addCase(getPokemon.fulfilled, (state,action)=>{
            state.loading=false
            state.data=action.payload?.results
        })
        .addCase(getPokemon.rejected, (state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(getAbility.pending, (state)=>{
            state.loading=true
        })
        .addCase(getAbility.fulfilled,(state,action)=>{
            state.loading=false
            state.ability=action.payload
        })
    }
})

export default pokemon.reducer
export const {nextPage} = pokemon.actions