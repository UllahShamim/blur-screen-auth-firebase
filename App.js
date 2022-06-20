import React, { useState } from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { BlurView } from 'expo-blur';
import profilePic from './assets/Images/profilePic.jpg'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg';
const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  )
}

function LoginScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed In')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
      <View style={{width: 100, height: 100, backgroundColor: 'purple', position: 'absolute', borderRadius: 50,}}></View>
      <View style={{width: 100, height: 100, backgroundColor: 'blue', top: 120,  position: 'absolute', transform: [{rotate: '25deg'}]}}></View>
      <View style={{width: 100, height: 100, backgroundColor: 'red', bottom: 120, position: 'absolute', borderRadius: 25, transform: [{rotate: '75deg'}]}}></View>
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <BlurView intensity={90}>
          <View style={styles.login}>
            <Image source={profilePic} style={styles.profilePicture}/>
            {/* Email field */}
            <View>
              <Text style={styles.labelText}>Email</Text>
              <TextInput  onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='E-mail' />
            </View>
            {/* Password field */}
            <View>
              <Text style={styles.labelText}>Password</Text>
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder='Password' secureTextEntry={true} />
            </View>
            {/* Login */}
            <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#00CFEB90'} ]}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Login</Text>
            </TouchableOpacity>
            {/* Create account */}
            <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Create account</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30,
  },
  labelText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
