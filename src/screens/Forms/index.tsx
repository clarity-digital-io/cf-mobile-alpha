import * as React from 'react';
import { Text, ScrollView, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { styled } from "nativewind";
import { useForms } from '../../queries/myForms';
import { Form__c, Response__c } from '../../utils/types/sObjects';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type RootStackParamList = {
  FormsList: undefined;
  Form: undefined;
};

const FormsStack = createStackNavigator<RootStackParamList>();

const StyledScrollView = styled(ScrollView);

export const FormsScreen = () => {
  return <FormsStack.Navigator
    initialRouteName="FormsList"
    screenOptions={() => ({
      headerShown: false
    })}
  >
    <FormsStack.Screen name='FormsList' component={FormsList} />
    <FormsStack.Screen name='Form' component={Form} />
  </FormsStack.Navigator>
}

export const FormsList = ({ navigation }: { navigation: any }) => {

  const { isSuccess, isLoading, data } = useForms();

  const handleSelect = (form: Form__c) => {
    navigation.navigate('Form', form)
  }

  return (
    <SafeAreaView>
      <StyledScrollView className='dark:bg-slate-800'>
        {
          data.map((form: Form__c) => {
            return <TouchableWithoutFeedback key={form.Id} onPress={() => handleSelect(form)} className='text-semibold justify-center p-4 border border-slate-200'>
              <Text>{form.cforms__Title__c}</Text>
            </TouchableWithoutFeedback>
          })
        }
      </StyledScrollView>
    </SafeAreaView>

  );
}

export const Form = ({ route, navigation }: { route: { params: Form__c }, navigation: any }) => {

  const handleNewResponse = () => {
    navigation.navigate('Responses', {
      screen: 'Response',
      params: {
        cforms__Form__c: route.params.Id,
        cforms__Status__c: 'New'
      } as Response__c
    })
  };

  return <SafeAreaView>
    <Text>form</Text>
    <TouchableHighlight onPress={handleNewResponse} underlayColor="white">
      <View>
        <Text>New</Text>
      </View>
    </TouchableHighlight>
  </SafeAreaView>
}