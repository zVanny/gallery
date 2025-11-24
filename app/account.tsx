import { useState, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { AccountView } from '@/components/modules/auth/AccountView'
import { supabase } from '@/lib/supabase'

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
    if(!session){
        return(
            <ActivityIndicator/>
        );
    }

    return (
        <View>
           <AccountView key={session.user.id} session={session} /> 
        </View>
    )
}