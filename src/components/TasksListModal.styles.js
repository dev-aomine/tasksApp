import {StyleSheet} from 'react-native';
import {scaleFont} from '../utils/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD79D',
  },
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
  },
  closeButton: {
    position: 'absolute',
    right: '5%',
  },
  closeButtonText: {
    fontSize: scaleFont(25),
    fontWeight: 'bold',
    color: 'black',
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
  },
  listItemIndex: {
    color: 'black',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  listItemName: {
    color: 'black',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  listItemDue: {
    color: 'black',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  headerComponentText: {
    color: 'black',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginVertical: '3%',
    marginLeft: '3%',
  },
  emptyListComponentText: {
    color: 'black',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginVertical: '3%',
    marginLeft: '3%',
  },
  sortButton: {
    borderWidth: 1,
  },
});
