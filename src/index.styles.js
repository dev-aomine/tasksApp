import {StyleSheet} from 'react-native';
import {scaleFont, scaleHeight} from './utils/dimensions';

export const styles = StyleSheet.create({
  container: {
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    height: '5%',
    marginHorizontal: '3%',
    backgroundColor: '#C4C4C4',
    borderRadius: 5,
    marginTop: '1%',
  },
  searchInput: {
    fontSize: scaleFont(16),
    color: 'black',
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    padding: '3%',
  },
  filterTitle: {
    color: 'black',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginVertical: '3%',
  },
  filterItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2%',
    justifyContent: 'space-between',
  },
  filterItemText: {
    color: 'black',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: scaleFont(50),
    color: 'black',
    fontWeight: 'bold',
  },
  resetButton: {
    position: 'absolute',
    bottom: scaleHeight(30),
    right: scaleHeight(10),
    fontSize: scaleFont(18),
    color: 'black',
    fontWeight: 'bold',
  },
});
