import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleAddItem = async () => {
    if (!name || !description) {
      // Show an alert if fields are empty
      Alert.alert('Error', 'Both name and description are required.');
      return;
    }

    const newItem = { name, description };
    try {
      // Load existing items
      const savedItems = await AsyncStorage.getItem('items');
      const items = savedItems ? JSON.parse(savedItems) : [];

      // Update items and save
      const updatedItems = [...items, newItem];
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));

      // Navigate back to home screen
      router.back();
    } catch (error) {
      console.error("Failed to add item:", error);
      Alert.alert('Error', 'Failed to add item. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Add a New Item</Text>
      <TextInput
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Item Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}