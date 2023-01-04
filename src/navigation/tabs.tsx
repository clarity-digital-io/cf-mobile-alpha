import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FormsScreen } from '../screens/Forms';
import { ResponsesScreen } from '../screens/Responses';
import { ChecklistsScreen } from '../screens/Checklists';
import { SettingsScreen } from '../screens/Settings';

import { SparklesIcon, Cog8ToothIcon, DocumentCheckIcon, ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from "react-native-heroicons/solid";
import { SparklesIcon as SparklesIconOutline, Cog8ToothIcon as Cog8ToothIconOutline, DocumentCheckIcon as DocumentCheckIconOutline, ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconOutline, ClipboardDocumentIcon as ClipboardDocumentIconOutline } from "react-native-heroicons/outline";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {

  return (
    <Tab.Navigator
      initialRouteName='Checklists'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Checklists') {
            return focused ? <ClipboardDocumentCheckIcon color={'#0f172a'} /> : <ClipboardDocumentCheckIconOutline color={'#64748b'} />
          } else if (route.name === 'Forms') {
            return focused ? <ClipboardDocumentIcon color={'#0f172a'} /> : <ClipboardDocumentIconOutline color={'#64748b'} />
          } else if (route.name === 'Responses') {
            return focused ? <DocumentCheckIcon color={'#0f172a'} /> : <DocumentCheckIconOutline color={'#64748b'} />
          } else if (route.name === 'Settings') {
            return focused ? <Cog8ToothIcon color={'#0f172a'} /> : <Cog8ToothIconOutline color={'#64748b'} />
          }
          // You can return any component that you like here!
          return <SparklesIcon />
        },
        tabBarActiveTintColor: '#0f172a',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: { backgroundColor: '#e2e8f0' },
        headerShown: false
      })}
    >
      <Tab.Screen name="Checklists" component={ChecklistsScreen} />
      <Tab.Screen name="Forms" component={FormsScreen} />
      <Tab.Screen name="Responses" component={ResponsesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}