import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styled } from "nativewind";
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Question__c, Response__c } from '../../utils/types/sObjects';
import { useResponses } from '../../queries/myResponses';
import { ResponseContextProvider, useResponseContext } from '../../context/ResponseContext';
import { ParamListBase } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormContextProvider, useFormContext } from '../../context/FormContext';
import { useForm } from '../../hooks';
import { ResponseDetail } from './Response';
import { StyledScrollView } from '../../components/View';

type RootStackParamList = {
  ResponsesList: undefined;
  Response: Response__c;
};

type ResponseListProps = NativeStackScreenProps<RootStackParamList, 'ResponsesList'>;
export type ResponseProps = NativeStackScreenProps<RootStackParamList, 'Response'>;

const ResponsesStack = createStackNavigator<RootStackParamList>();

export const ResponsesScreen = () => {
  return <ResponsesStack.Navigator
    initialRouteName="ResponsesList"
    screenOptions={() => ({
      headerShown: false
    })}
  >
    <ResponsesStack.Screen name='ResponsesList' component={ResponsesList} />
    <ResponsesStack.Screen name='Response' component={Response} />
  </ResponsesStack.Navigator>
}

export const ResponsesList = ({ navigation }: { navigation: any }) => {

  const { isSuccess, isLoading, data } = useResponses();

  const handleSelect = (response: Response__c) => {
    navigation.navigate('Response', response)
  }

  return (
    <SafeAreaView>
      <StyledScrollView className='dark:bg-slate-800'>
        {
          data.map((response: Response__c) => {
            return <TouchableWithoutFeedback key={response.Id} onPress={() => handleSelect(response)} className='text-semibold justify-center p-4 border border-slate-200'>
              <Text>{response.cforms__Form__c}</Text>
            </TouchableWithoutFeedback>
          })
        }
      </StyledScrollView>
    </SafeAreaView>

  );
}

export const Response = (props: ResponseProps) => {
  const { route } = props;

  return <FormContextProvider formId={route.params.cforms__Form__c} >
    <ResponseContextProvider>
      <ResponseDetail {...props} />
    </ResponseContextProvider>
  </FormContextProvider>
}

