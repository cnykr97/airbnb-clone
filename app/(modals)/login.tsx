import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
  Apple = 'oauth_apple',
  Google = 'oauth_google',
  Facebook = 'oauth_facebook',
}

const Page = () => {
  useWarmUpBrowser() // browser is fine on android

  const router = useRouter()

  const { startOAuthFlow: appleAuth } = useOAuth({strategy: 'oauth_apple'});
  const { startOAuthFlow: googleAuth } = useOAuth({strategy: 'oauth_google'});
  const { startOAuthFlow: facebookAuth } = useOAuth({strategy: 'oauth_facebook'});

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth()
      console.log('variable: createdSessionId file: login.tsx line: [31] ===', createdSessionId);

      if (createdSessionId) {  // user is authenticated
        setActive!({session: createdSessionId})
        router.back()
      }

    } catch (error) {
      console.error("Auth error: ", error)
    }
  }

  return (
    <View style={[defaultStyles.container, {padding: 26}]} >
      <View style={{gap: 20}} >
        <TextInput autoCapitalize='none' placeholder='email' style={defaultStyles.inputField} />
        <TextInput autoCapitalize='none' placeholder='password' style={defaultStyles.inputField} />
      </View>
      <TouchableOpacity style={[defaultStyles.btn, {marginVertical: 30}]} >
        <Text style={defaultStyles.btnText} >Continue</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} >
        <View style={styles.seperator}/>
        <Text 
          style={{
            fontFamily: 'mon-sb'
          }}>
            or
        </Text>
        <View style={styles.seperator}/>
      </View>

      <View style={styles.bottomContaier} >
        <TouchableOpacity style={styles.buttonOutline} >
          <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={20} />
          <Text style={styles.buttonText} >Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => {onSelectAuth(Strategy.Apple)} }>
          <Ionicons name='md-logo-apple' style={defaultStyles.btnIcon} size={20} />
          <Text style={styles.buttonText} >Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => {onSelectAuth(Strategy.Google)} } >
          <Ionicons name='md-logo-google' style={defaultStyles.btnIcon} size={20} />
          <Text style={styles.buttonText} >Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => {onSelectAuth(Strategy.Facebook)} } >
          <Ionicons name='md-logo-facebook' style={defaultStyles.btnIcon} size={20} />
          <Text style={styles.buttonText} >Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  seperator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
    flex: 1
  },
  bottomContaier: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingTop: 30
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%'
  },
  buttonText: {
    fontFamily: 'mon-sb'
  }
})

export default Page