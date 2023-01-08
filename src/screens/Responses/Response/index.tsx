import * as React from 'react';
import { Text, View, Button, Touchable } from 'react-native';
import { styled } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Question__c, Response__c } from '../../../utils/types/sObjects';
import { useResponseContext } from '../../../context/ResponseContext';
import { useFormContext } from '../../../context/FormContext';
import { ResponseProps } from '..';
import { StyledScrollView } from '../../../components/View';
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QuestionTypes } from '../../../utils/types/fields';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  ResponseQuestions: Response__c;
  ResponseCamera: undefined;
};

export type ResponseDetailProps = NativeStackScreenProps<RootStackParamList, 'ResponseQuestions'>;

const ResponseDetailStack = createStackNavigator<RootStackParamList>();

export const ResponseDetail = (props: ResponseProps) => {

  const { route, navigation } = props;

  React.useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation])


  const _response = route.params;

  const { setResponse } = useResponseContext();

  React.useEffect(() => {
    setResponse(_response)
  }, [_response])

  return <ResponseDetailStack.Navigator
    initialRouteName="ResponseQuestions"
    screenOptions={() => ({
      headerShown: false
    })}
  >
    <ResponseDetailStack.Screen name='ResponseQuestions' component={ResponseQuestions} />
    <ResponseDetailStack.Screen name='ResponseCamera' component={ResponseCamera} />
  </ResponseDetailStack.Navigator>
}

const ResponseQuestions = (props: ResponseDetailProps) => {

  const { route, navigation } = props;

  const { questions } = useFormContext();
  // load form 
  // load questions 
  // if not new prepopulate saved answers

  const viewCamera = () => {
    navigation.navigate('ResponseCamera');
  }

  return <SafeAreaView>
    <StyledScrollView className='dark:bg-slate-800'>
      {
        questions.map((question: Question__c) => {
          return <View key={question.Id} className='text-semibold justify-center p-4 border border-slate-200'>
            <Text>{question.cforms__Title__c} - {question.cforms__Type__c} </Text>
            {
              question.cforms__Type__c === QuestionTypes.Photo &&
              <Button onPress={viewCamera} title='Camera' />
            }
          </View>
        })
      }
    </StyledScrollView>
  </SafeAreaView>
}

const ResponseCamera = () => {
  const [type, setType] = React.useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View className='flex'>
      <Camera type={type}>
        <View >
          <TouchableOpacity onPress={toggleCameraType}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}