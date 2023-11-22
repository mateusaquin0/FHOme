import {Button, Divider, Icon, Text} from '@rneui/themed';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../global/styles';
import {IOrder, OrderStatusEnum, useOrders} from '../../hooks/useOrders';
import {useContext, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Timestamp} from 'firebase/firestore';
import {CancelOrderModal} from './CancelOrderModal';
import {ConfirmModal} from '../shared/ConfirmModal';
import {OrderDetailsModal} from './OrderDetailsModal';

interface OrderCardProps {
  item: IOrder;
  reload: () => void;
  onCancel: (id: string) => void;
}

interface buttonOptions {
  next: string;
  onClick: () => void;
}

export enum TranslateOrderStatusEnum {
  CANCELED = 'Pedido cancelado',
  ANALYSIS = 'Pedido em análise',
  PREPARATION = 'Pedido em preparação',
  SEPARATE = 'Pedido pronto para retirada',
  DELIVERED = 'Pedido entregue',
}

export function OrderCard({item, reload, onCancel}: OrderCardProps) {
  const {cancelOrder, confirmDelivery, setPreparation, setSeparate} =
    useOrders();
  const [openCancel, setOpenCancel] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const {userType} = useContext(UserContext);
  const qtyItems = item.products.length;

  const buttonTitle = () => {
    if (userType === 'customer' && item.status === OrderStatusEnum.ANALYSIS)
      return null;
    else if (userType === 'customer') return button['SEPARATE'].next;
    return button[item.status].next;
  };

  const buttonAction = () => {
    if (userType === 'customer') return button['SEPARATE'].onClick;
    return button[item.status].onClick;
  };

  const handleCancel = async (reason: string) => {
    await cancelOrder(item.id!, reason, userType!);
    setOpenCancel(false);
    reload();
  };

  const handleConfirmDelivery = async () => {
    await confirmDelivery(item.id!);
    setOpenDelivery(false);
    reload();
  };

  const button: {[key: string]: buttonOptions} = {
    ANALYSIS: {
      next: 'Colocar em preparação',
      onClick: async () => {
        await setPreparation(item.id!);
        reload();
      },
    },
    PREPARATION: {
      next: 'Marcar como pronto',
      onClick: async () => {
        await setSeparate(item.id!);
        reload();
      },
    },
    SEPARATE: {
      next: 'Marcar como entregue',
      onClick: () => setOpenDelivery(true),
    },
  };

  return (
    <>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{getDate(item.createdAt)}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setOpenDetails(true)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 5,
            }}>
            <View style={{gap: 3, flex: 1, flexBasis: '50%'}}>
              {userType === 'employee' && (
                <View>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                </View>
              )}
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.qtyLabel}>{item.qtd[0]}x</Text>
                <Text style={styles.qtyText}> {item.products[0]}</Text>
              </View>
              {qtyItems > 1 && (
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Text style={styles.qtyLabel}>{item.qtd[1]}x</Text>
                  <Text style={styles.qtyText}> {item.products[1]}</Text>
                </View>
              )}
              {qtyItems > 2 && (
                <View>
                  <Text style={styles.qtyLabel}>+ {qtyItems - 2} itens</Text>
                </View>
              )}
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 3,
              }}>
              <View style={{alignItems: 'center', width: '100%'}}>
                <Text style={styles.statusLabel}>
                  {TranslateOrderStatusEnum[item.status]}
                </Text>
              </View>
              <View style={styles.codeContainer}>
                <Text style={styles.codeLabel}>Código de retirada</Text>
                <Text style={styles.codeText}>#{item.code}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View>
          <Divider color={colors.orange} />
          {item.status !== OrderStatusEnum.CANCELED ? (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              {item.status !== OrderStatusEnum.DELIVERED && (
                <>
                  <Button
                    title="Cancelar"
                    onPress={() => onCancel(item.id!)}
                    buttonStyle={styles.outlineStyledButton}
                    titleStyle={styles.outlineButtonTitle}
                  />
                  {buttonTitle() !== null && (
                    <Button
                      title={buttonTitle()!}
                      onPress={buttonAction()}
                      buttonStyle={styles.styledButton}
                      titleStyle={styles.buttonTitle}
                    />
                  )}
                </>
              )}
            </View>
          ) : (
            <View style={{marginTop: 10, gap: 3}}>
              <Text style={styles.cancelReasonLabel}>
                Motivo do cancelamento
              </Text>
              <Text style={styles.cancelReason}>{item.cancelReason}</Text>
            </View>
          )}
        </View>
      </View>

      {openCancel && (
        <CancelOrderModal
          isVisible={openCancel}
          onClose={() => setOpenCancel(false)}
          onConfirm={handleCancel}
        />
      )}

      {openDelivery && (
        <ConfirmModal
          isVisible={openDelivery}
          title="Confirmar entrega"
          description="Tem certeza que deseja confirmar que esse pedido foi entregue?"
          onClose={() => setOpenDelivery(false)}
          onConfirm={handleConfirmDelivery}
        />
      )}

      {openDetails && (
        <OrderDetailsModal
          isVisible={openDetails}
          handleClose={() => setOpenDetails(false)}
          order={item}
        />
      )}
    </>
  );
}

const getDate = (timestamp: Timestamp) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = timestamp.toDate().toLocaleDateString('pt-BR', options);
  return date;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray4,
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    justifyContent: 'space-between',
    elevation: 1,
  },

  codeContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: colors.gray3,
    backgroundColor: colors.cardBackground,
    borderRadius: 5,
    alignItems: 'center',
  },

  codeLabel: {
    fontSize: 12,
    color: colors.orange,
  },

  codeText: {
    fontSize: 12,
    color: colors.gray1,
  },

  dateContainer: {
    marginBottom: 5,
  },

  title: {
    fontSize: 16,
    color: colors.gray1,
  },

  date: {
    fontSize: 12,
    color: colors.gray3,
  },

  description: {
    fontSize: 12,
    color: colors.gray3,
    fontStyle: 'italic',
  },

  price: {
    color: colors.gray1,
    fontSize: 18,
    fontWeight: 'bold',
  },

  styledButton: {
    backgroundColor: '#ff8c52',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FfBc52',
    minWidth: '45%',
    height: 40,
  },

  outlineStyledButton: {
    backgroundColor: '#00000000',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.alert,
    minWidth: '45%',
    height: 40,
  },

  buttonTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  outlineButtonTitle: {
    color: colors.alert,
    fontSize: 12,
  },

  qtyLabel: {
    fontSize: 12,
    color: colors.gray2,
  },

  qtyText: {
    fontSize: 14,
    color: colors.gray1,
  },

  statusLabel: {
    fontSize: 12,
    color: colors.gray2,
  },

  cancelReasonLabel: {
    fontSize: 12,
    color: colors.gray1,
  },

  cancelReason: {
    fontSize: 12,
    color: colors.gray2,
  },

  customerName: {
    fontSize: 14,
    color: colors.gray1,
  },
});
