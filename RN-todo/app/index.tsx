import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Item {
  name: string;
  description: string;
  completed: boolean;
}

interface Lists {
  [key: string]: Item[];
}

const HomePage: React.FC = () => {
  const [lists, setLists] = useState<Lists>({});
  const [currentCategory, setCurrentCategory] = useState<string>('Default');
  const [newItemName, setNewItemName] = useState<string>('');
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);

  const addItemToList = () => {
    if (newItemName.trim() === '') return;
    setLists(prevLists => {
      const updatedList = prevLists[currentCategory] || [];
      updatedList.push({ name: newItemName, description: '', completed: false });
      return { ...prevLists, [currentCategory]: updatedList };
    });
    setNewItemName('');
    setIsAddingItem(false);
    Keyboard.dismiss();
  };

  const toggleItemCompleted = (itemIndex: number) => {
    setLists(prevLists => {
      const updatedList = prevLists[currentCategory].map((item, index) => {
        if (index === itemIndex) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }).filter(item => !item.completed);
      return { ...prevLists, [currentCategory]: updatedList };
    });
  };

  const updateItem = (category: string, itemIndex: number, newItem: Item) => {
    setLists(prevLists => {
      const updatedList = prevLists[category].map((item, index) => {
        return index === itemIndex ? newItem : item;
      });
      return { ...prevLists, [category]: updatedList };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{currentCategory}</Text>
        <TouchableOpacity onPress={() => setIsAddingItem(true)}>
          <Feather name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={lists[currentCategory] || []}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => toggleItemCompleted(index)}>
              <Feather name={item.completed ? "check-square" : "square"} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />

      {isAddingItem && (
        <TextInput
          style={styles.input}
          value={newItemName}
          onChangeText={setNewItemName}
          placeholder="Enter item name..."
          onSubmitEditing={addItemToList}
          autoFocus
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#25292e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    marginLeft: 16,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginTop: 16,
    backgroundColor: 'white',
  },
});

export default HomePage;
