import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TouchableOpacity, Text, TextInput } from 'react-native'
import { supabase } from '@/lib/supabase'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { data: { session }, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Revisa tu correo para verificar tu cuenta')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@address.com"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.mt20]}
        disabled={loading}
        onPress={signInWithEmail}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={signUpWithEmail}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBECFF', // moradito/azul suave
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 30,
    color: '#3A3A7A',
  },
  section: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A9A9C9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: '#6B63FF',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  mt20: {
    marginTop: 20,
  }
})
