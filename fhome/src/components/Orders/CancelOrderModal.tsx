import {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors} from '../../global/styles';
import {ConfirmModal} from '../shared/ConfirmModal';

interface CancelOrderModalProps {
  onClose: () => void;
  onConfirm: (str: string) => void;
  isVisible: boolean;
}

export function CancelOrderModal({
  isVisible,
  onClose,
  onConfirm,
}: CancelOrderModalProps) {
  const [description, setDescription] = useState('');

  const handleConfirm = () => {
    onConfirm(description);
  };

  return (
    <ConfirmModal
      isVisible={isVisible}
      title="Cancelar pedido"
      description="Descreva abaixo o motivo do cancelamento do pedido."
      cancelLabel="Desistir"
      onClose={onClose}
      onConfirm={handleConfirm}>
      <TextInput
        placeholderTextColor={colors.gray3}
        style={{...styles.input, textAlignVertical: 'top'}}
        value={description}
        onChangeText={text => setDescription(text)}
        multiline
        numberOfLines={3}
        maxLength={150}
      />
    </ConfirmModal>
  );
}

const styles = StyleSheet.create({
  input: {
    color: colors.gray1,
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
});
