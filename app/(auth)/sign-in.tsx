import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, View, ActivityIndicator, TextInput } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import OAuthButton from '@/components/OAuthButton'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { styles } from "@/constants/styles"
import { Ionicons } from '@expo/vector-icons'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId
        })

        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  if(!isLoaded) {
    return <ActivityIndicator size="large" />
  }

  return (
    <View style={styles.authScreen}>
      <View style={styles.authForm}>

        {/* Header text */}
        <ThemedView style={{ marginVertical: 16, alignItems: "center" }}>
          <ThemedText type='title'>
            Sign into Daily Reps
          </ThemedText>
          <ThemedText type='default'>
            Welcome back! Please sign in to continue
          </ThemedText>
        </ThemedView>

        {/* OAuth buttons */}
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 8
        }}>
          <View style={{ flex: 1 }}>
            <OAuthButton strategy="oauth_google">
              <MaterialCommunityIcons name="google" size={18} />{" "}
              Google
            </OAuthButton>
          </View>
        </View>

        {/* Form separator */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: "#555"}}>or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
        </View>

        {/* Input fields */}
        <View style={{ gap: 8, marginBottom: 24 }}>
          <Text>Email address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        {/* Sign in button */}
        <Button onPress={onSignInPress}>
          <Text>Sign in</Text> <Ionicons name='caret-forward' />
        </Button>

        {/* Suggest new users create an account */}
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          marginVertical: 18
        }}>
          <Text>Don't have an account?</Text>
          <Link href="/sign-up">
            <Text style={{ fontWeight: "bold" }}>Sign up</Text>
          </Link>
        </View>

      </View>
    </View>
  )
}