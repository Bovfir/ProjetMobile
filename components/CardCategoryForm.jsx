import React from 'react';
import { Pressable, View, Text } from 'react-native';
import IconComponents from '../utils/IconComponents';


export default function CardCategoryForm({category, selectedCategory, setSelectedCategory , styles}){
    
    const IconComponent = IconComponents[category.icon_component_name] || IconComponents.MaterialIcons;

    return(
            <Pressable key={category.id} onPress={() => setSelectedCategory(category.id)}
                style={[
                    styles.cardCategory,
                    selectedCategory === category.id
                        ? { backgroundColor: "#4B0082", borderColor: "#FFFFFF", borderWidth: 1 } 
                        : { backgroundColor: "#FFFFFF", borderColor: "#4B0082", borderWidth: 1 }, 
                ]}
            >
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <IconComponent name={category.icon_name} color={selectedCategory === category.id ? 'white' : '#4B0082'} size={25}/>
                <Text 
                    style={[
                        styles.textCategory, 
                        { color: selectedCategory === category.id ? 'white' : '#4B0082' }
                    ]}>
                    {category.title}
                </Text>
            </View>
        </Pressable>
    );
};