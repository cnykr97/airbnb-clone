import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const categories = [
  {
    name: 'Tiny homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'house-siding',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
];

const ExploreHeader = () => {

  const itemsRef = useRef<Array<TouchableOpacity | null>>([])
  const [activeIndex, setactiveIndex] = useState(0)

  const selectCategory = (index: number) => {
    setactiveIndex(index)
  }

  return (
    <SafeAreaView style={{flex: 1}} >
      <View style={styles.container} >
        <View style={styles.actionRow} >
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn} >
              <Ionicons name='search' size={24} />
              <View>
                <Text style={{fontFamily: 'mon-sb'}} >Where to ?</Text>
                <Text style={{fontFamily: 'mon', color: Colors.grey}} >Anywhere • Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn} >
            <Ionicons name='options-outline' size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 15
          }}
        >
          {categories.map((category, index) => 
            <TouchableOpacity
              key={index}
              ref={(element) => itemsRef.current[index] = element}
              style={activeIndex === index ? styles.categortiesBtnActive : styles.categortiesBtnInactive}
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons name={category.icon as any} size={24}/>
              <Text>{category.name}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      height: 150,
      flexDirection: "column",
    },
    actionRow: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 10,
      gap: 30
    },
    filterBtn: {
      borderWidth: 1,
      borderRadius: 24,
      padding: 10,
      borderColor: Colors.grey,
    },
    searchBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#c2c2c2',
      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#fff',

      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
    categoryTextActive: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: '#000'
    },
    categoryTextInactive: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: Colors.grey
    },
    categortiesBtnActive: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    categortiesBtnInactive: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
    }
});

export default ExploreHeader