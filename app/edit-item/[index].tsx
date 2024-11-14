import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditItemScreen() {
  const { index } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadItem = async () => {
      const savedItems = await AsyncStorage.getItem('items');
      const items = savedItems ? JSON.parse(savedItems) : [];
      const itemIndex = parseInt(index, 10);
      if (items[itemIndex]) {
        setName(items[itemIndex].name);
        setDescription(items[itemIndex].description);
      }
    };
    loadItem();
  }, [index]);

  const handleSaveItem = async () => {
    if (!name || !description) {
      // Show an alert if fields are empty
      Alert.alert('Error', 'Both name and description are required.');
      return;
    }

    const savedItems = await AsyncStorage.getItem('items');
    const items = savedItems ? JSON.parse(savedItems) : [];
    const itemIndex = parseInt(index, 10);
    items[itemIndex] = { name, description };

    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
      router.back();
    } catch (error) {
      console.error("Failed to save item:", error);
      Alert.alert('Error', 'Failed to save item. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Edit Item</Text>
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
      <Button title="Save Changes" onPress={handleSaveItem} />
    </View>
  );
}