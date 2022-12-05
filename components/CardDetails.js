import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAbility } from '../features/getPokemonSlice'

const CardDetails = ({route}) => {
    const dispatch = useDispatch()
    const {ability} = useSelector(state => state.pokemon)
    const {name,url,image} = route?.params
    const Abilities = ({item})=><View className="mt-1 ml-6 flex flex-row">
        <Text className="uppercase font-semibold bg-blue-600 px-1 rounded-md text-gray-50">{item.ability?.name}</Text>
    </View>

    const Stats = ({item})=><View className={`w-full h-8 border-2 border-orange-600 relative mt-2 flex  justify-center item rounded-md`}>
        <View style={{width:item.base_stat>100?'100%':item.base_stat+"%"}} className={`h-7 absolute top-0 left-0 bg-orange-300 rounded-md`}></View>
        <Text className="text-indigo-700 font-semibold text-sm uppercase ml-2">{item.stat?.name} {item.base_stat}</Text>
    </View>
    useEffect(()=>{
        dispatch(getAbility(url))
    },[])
    console.log(ability)
  return (
    <View className="flex flex-col w-full h-full items-center space-y-4 bg-orange-100 py-2">
        <View className="w-40 h-40 flex items-center justify-center rounded-full bg-purple-400 border border-orange-500">
            <Image source={{uri:image}} className="w-28 h-28" />
        </View>
        <Text className="uppercase text-xl font-bold bg-purple-600 text-white px-1 rounded-md self-start ml-4">{name}</Text>

        <View className="flex flex-row space-y-2 w-full items-start px-4">
            <Text className="text-lg font-semibold text-gray-600 px-1 rounded-md">Stats :</Text>
            <FlatList data={ability?.stats} renderItem={Stats} />
        </View>

        <View className="flex flex-row space-y-2 w-full items-start px-4">
            <Text className="text-lg font-semibold text-gray-600 px-1 rounded-md">Abilities :</Text>
            <FlatList data={ability?.abilities} renderItem={Abilities} />
        </View>

    </View>
  )
}

export default CardDetails