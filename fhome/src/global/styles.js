import {StyleSheet} from 'react-native';

export const colors = {
  buttons: '#ff8c52',
  gray1: '#43484d',
  gray2: '#5e6977',
  gray3: '#86939e',
  gray4: '#bdc6cf',
  gray5: '#e1e8ee',
  orange: '#ff8c52',
  green: '#4bb543',
  cardComment: '#86939e',
  cardBackground: '#ffffff',
  statusBar: '#ff8c52',
  headerText: '#ffffff',
  alert: '#f02c2c',
};

export const parameters = {
  headerHeight: 40,
};

export const styledComponents = StyleSheet.create({
  styledButton: {
    backgroundColor: '#ff8c52',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FfBc52',
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
  },

  outlineStyledButton: {
    backgroundColor: '#00000000',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ff8c52',
    height: 50,
    paddingHorizontal: 20,
  },

  buttonTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -3,
  },

  outlineButtonTitle: {
    color: '#ff8c52',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -3,
  },

  socialIcon: {
    borderRadius: 12,
    height: 50,
    width: '100%',
    margin: 0,
  },
});

export const pickerStyles = StyleSheet.create({
  inputAndroid: {
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 12,
    paddingHorizontal: 10,
    color: colors.gray1,
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 12,
    paddingHorizontal: 10,
    color: colors.alert,
  },
});
