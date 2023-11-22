import {FlatList, StyleSheet} from 'react-native';
import {Category, useCategories} from '../../hooks/useCategories';
import {FoodCategory} from './FoodCategory';
import {View} from 'react-native-animatable';
import {Button, Text} from '@rneui/themed';
import {colors} from '../../global/styles';

interface CategorySliderProps {
  handleCategory: (id: string) => void;
  checkedCategory: string;
  categories: Category[];
}

export function CategorySlider({
  handleCategory,
  checkedCategory,
  categories,
}: CategorySliderProps) {
  return (
    <View style={styles.categoriesContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.categoriesTitle}>Categorias Populares</Text>
        <Button
          title="Todas"
          type="clear"
          onPress={() => handleCategory('')}
          titleStyle={{
            color: !checkedCategory ? colors.orange : colors.gray4,
            ...styles.viewAll,
          }}
        />
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <FoodCategory
              categoryName={item.Nome}
              iconName={item.Icone}
              isChecked={checkedCategory === item.Nome}
              onPress={() => {
                handleCategory(item.Nome);
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{width: 5}} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    gap: 10,
    marginHorizontal: 10,
  },

  categoriesTitle: {
    fontSize: 18,
    color: colors.gray1,
  },

  viewAll: {
    fontSize: 14,
  },
});
