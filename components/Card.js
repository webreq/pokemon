import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemon } from '../features/getPokemonSlice'
import { generateIdImage, getLinkImage } from '../services/generateLinkImage'

const Card = ({navigation}) => {
    const dispatch = useDispatch()
    const {data} = useSelector(state=>state.pokemon)
    const items = ({item})=> <TouchableOpacity className="m-1 flex-col w-40 h-40 justify-center items-center rounded-full relative"
    onPress={()=>{
        navigation.navigate("Pokemon",{name:item?.name,url:item?.url,image:getLinkImage(generateIdImage(item?.url))})
    }}
    >
        <View className="absolute top-0 left-0 bg-red-600 rounded-t-full w-40 h-20 border-x-4 border-t-2"></View>
        <View className="absolute bottom-0 left-0 bg-slate-300 rounded-b-full w-40 h-20 border-x-4 border-t-2 border-b-4 border-black"></View>
        <Image className="w-28 h-28" source={{uri:getLinkImage(generateIdImage(item?.url))}} />
        <Text className="uppercase text-xs font-semibold text-white px-1 bg-yellow-600 rounded-md -mt-2">{item?.name}</Text>
    </TouchableOpacity>
    useEffect(()=>{
        dispatch(getPokemon())
    },[])
  return (
    <View className="flex flex-col items-center bg-violet-50 pb-10 pt-2 w-full h-screen">
        <View className="flex flex-row justify-between items-center w-full px-4 pb-1">
            <View className="flex flex-row items-center w-28 h-10">
                <Image className="w-10 h-10" source={{uri:'https://www.freepnglogos.com/uploads/pokemon-symbol-logo-png-31.png'}} />
                <Text className="ml-2 text-gray-800">{data.length}</Text>
            </View>
            <Image className="w-28 h-20" source={{uri:'https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png'}} />
        </View>

        <FlatList numColumns={2} data={data} renderItem={items}
        onEndReached={()=>{
            dispatch(getPokemon())
        }}
        ListFooterComponent={()=><Text className="text-gray-500 font-semibold">Loading</Text>}
         />
    </View>
  )
}

export default Card