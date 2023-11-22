import {
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MenuItem, useMenu} from '../../hooks/useMenu';
import {colors, pickerStyles, styledComponents} from '../../global/styles';
import {Button, Divider, Icon, Text} from '@rneui/themed';
import {useState, useEffect, useContext} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import CurrencyInput from 'react-native-currency-input';
import {UserContext} from '../../contexts/UserContext';

interface AddEditProductModalProps {
  isVisible: boolean;
  handleClose: () => void;
  product?: MenuItem;
  reload: () => void;
}

export function AddEditProductModal({
  isVisible,
  handleClose,
  product,
  reload,
}: AddEditProductModalProps) {
  const {categoriesList} = useContext(UserContext);
  const {addProduct, updateProduct} = useMenu();

  const [name, setName] = useState(product?.Nome ?? '');
  const [description, setDescription] = useState(product?.Descricao ?? '');
  const [type, setType] = useState(product?.Tipo ?? categoriesList[0].Nome);
  const [price, setPrice] = useState<number | null>(product?.Preco ?? null);
  const [disponible, setDisponible] = useState(product?.Disponivel ?? true);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    const id = product?.id;
    const newProduct = {
      Nome: name,
      Descricao: description,
      Tipo: type!,
      Preco: price!,
      Disponivel: disponible,
    };

    if (validateField()) return;
    setIsLoading(true);

    if (product) {
      updateProduct({...newProduct, id}).then(() => {
        setIsLoading(false);
        handleClose();
        reload();
      });
    } else {
      addProduct(newProduct).then(() => {
        setIsLoading(false);
        handleClose();
        reload();
      });
    }
  };

  const validateField = () => {
    const hasEmptyField = !name || !description || !type || price === null;
    setHasError(hasEmptyField);
    return hasEmptyField;
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={handleClose}>
      <TouchableOpacity
        style={{flex: 1, backgroundColor: '#00000050'}}
        onPress={handleClose}
        activeOpacity={0.9}
      />
      <View style={styles.absoluteContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {product ? 'Editar produto' : 'Adicionar produto'}
          </Text>
          <Divider color={colors.orange} />

          <ScrollView>
            <View style={{gap: 10}}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  placeholderTextColor={colors.gray3}
                  style={styles.input}
                  value={name}
                  onChangeText={text => setName(text)}
                  maxLength={30}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tipo</Text>
                <RNPickerSelect
                  placeholder={{}}
                  value={type}
                  onValueChange={value => setType(value)}
                  items={categoriesList.map((category, index) => ({
                    label: category.Nome,
                    value: category.Nome,
                    key: index,
                  }))}
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyles}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Preço</Text>
                <CurrencyInput
                  style={styles.input}
                  value={price}
                  onChangeValue={setPrice}
                  prefix="R$ "
                  separator=","
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                  placeholderTextColor={colors.gray3}
                  style={{...styles.input, textAlignVertical: 'top'}}
                  value={description}
                  onChangeText={text => setDescription(text)}
                  multiline
                  numberOfLines={3}
                  maxLength={120}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Disponível para venda</Text>
                <RNPickerSelect
                  placeholder={{}}
                  value={disponible ?? true}
                  onValueChange={value => setDisponible(value)}
                  items={[
                    {label: 'Sim', value: true, key: 0},
                    {label: 'Não', value: false, key: 1},
                  ]}
                  useNativeAndroidPickerStyle={false}
                  style={pickerStyles}
                />
              </View>
            </View>
          </ScrollView>

          {hasError && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Icon
                type="material-community"
                name="alert"
                color={colors.alert}
                size={18}
              />
              <Text style={styles.alert}>Preencha todos os campos</Text>
            </View>
          )}

          <View style={{marginTop: 5}}>
            <Button
              title="Salvar"
              buttonStyle={styledComponents.styledButton}
              titleStyle={styledComponents.buttonTitle}
              onPress={handleSave}
              loading={isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    width: '100%',
    borderRadius: 12,
    padding: 20,
    gap: 10,
    height: '90%',
  },

  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
  },

  label: {
    color: colors.gray2,
  },

  inputContainer: {
    gap: 5,
  },

  input: {
    color: colors.gray1,
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  alert: {
    color: colors.alert,
  },
});
