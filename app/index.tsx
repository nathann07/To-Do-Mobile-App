import React, { useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import colors from './colors';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  // Load items from AsyncStorage whenever the screen is in focus
  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        try {
          const savedItems = await AsyncStorage.getItem('items');
          if (savedItems) {
            setItems(JSON.parse(savedItems));
          }
        } catch (error) {
          console.error("Failed to load items:", error);
        }
      };
      loadItems();
    }, [])
  );

  // Delete item with confirmation prompt
  const confirmDeleteItem = (index) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteItem(index)
        }
      ]
    );
  };

  const handleDeleteItem = async (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    Alert.alert("Deleted", "The item has been deleted successfully.");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 16 }}>
        My To-Do App
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            backgroundColor: 'white',
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            marginBottom: 10,
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: colors.text }}>{item.name}</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push(`/edit-item/${index}`)}>
              <FontAwesome name="pencil" size={24} color={colors.primary} style={{ marginRight: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDeleteItem(index)}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Link href="/add-item" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Add New Item</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}