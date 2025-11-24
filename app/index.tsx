import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { LoginView } from '@/components/modules/auth/LoginView'
import { supabase } from '@/lib/supabase'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { HomeView } from '@/components/modules/home/HomeView'

export default function IndexScreen() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {session && session.user ? (
                    <HomeView />
                ) : (
                    <LoginView />
                )}
            </View>
        </GestureHandlerRootView>
    )
}
