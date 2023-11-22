import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../global/styles';
import {Divider, Text} from '@rneui/themed';
import {Button} from '@rneui/base';
import React from 'react';

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isVisible: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
}

export function ConfirmModal({
  isVisible,
  onConfirm,
  onClose,
  title,
  description,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
}: ConfirmModalProps) {
  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <TouchableOpacity
        style={{flex: 1, backgroundColor: '#00000050'}}
        onPress={onClose}
        activeOpacity={0.9}
      />
      <View style={styles.absoluteContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {!!description && <Text style={styles.text}>{description}</Text>}

          <Divider color={colors.orange} />

          {children}

          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Button
              title={cancelLabel}
              buttonStyle={styles.outlineStyledButton}
              titleStyle={styles.outlineButtonTitle}
              onPress={onClose}
            />
            <Button
              title={confirmLabel}
              buttonStyle={styles.styledButton}
              titleStyle={styles.buttonTitle}
              onPress={onConfirm}
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

  text: {
    color: colors.gray3,
  },

  styledButton: {
    backgroundColor: '#ff8c52',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FfBc52',
    minWidth: '45%',
  },

  outlineStyledButton: {
    backgroundColor: '#00000000',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.alert,
    minWidth: '45%',
  },

  buttonTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -3,
  },

  outlineButtonTitle: {
    color: colors.alert,
    fontSize: 14,
    marginTop: -3,
  },
});
