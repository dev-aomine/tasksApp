import {StyleSheet} from 'react-native';
import {scaleFont} from '../utils/dimensions';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    height: '50%',
  },
  modalTitle: {
    alignSelf: 'center',
    fontSize: scaleFont(18),
    color: 'black',
    fontWeight: 'bold',
    marginVertical: '5%',
  },
  label: {
    fontSize: scaleFont(14),
    color: 'black',
    fontWeight: 'bold',
    marginLeft: '1%',
    marginBottom: '2%',
  },
  input: {
    borderWidth: 1,
    height: '15%',
    fontSize: scaleFont(14),
    marginBottom: '3%',
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
