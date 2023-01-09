import * as React from 'react';
import { Text, ScrollView, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { styled } from "nativewind";
import { useForms } from '../../queries/myForms';
import { Form__c, Response__c } from '../../utils/types/sObjects';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ClipboardDocumentIcon as ClipboardDocumentIconOutline } from "react-native-heroicons/outline";

type RootStackParamList = {
  FormsList: undefined;
  Form: undefined;
};

const FormsStack = createStackNavigator<RootStackParamList>();

const StyledScrollView = styled(ScrollView);
const StyledClipboardDocumentCheckIconOutline = styled(ClipboardDocumentIconOutline);

export const FormsScreen = () => {
  return <FormsStack.Navigator
    initialRouteName="FormsList"
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
            return <TouchableWithoutFeedback
              key={form.Id}
              onPress={() => handleSelect(form)}
            >
              <View className='bg-slate-200 flex flex-row gap-4  p-2'>
                <View className='basis-1/5'>
                  <StyledClipboardDocumentCheckIconOutline className='text-slate-900 p-2' />
                </View>
                <View className='basis-4/5'>
                  <Text className='text-bold text-lg p-2'>
                    {form.cforms__Title__c}
                  </Text>
                  <Text className='text-normal text-sm p-2'>
                    {form.cforms__Description__c}
                  </Text>
                  <Text className='text-normal text-sm p-2'>
                    {form.cforms__Status__c}
                  </Text>
                </View>
              </View>

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