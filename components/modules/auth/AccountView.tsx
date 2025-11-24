import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { StyleSheet, View, Alert, TextInput, Text, TouchableOpacity } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { AvatarView } from './AvatarView'

export function AccountView({ session }: { session: Session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (session) getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', session?.user.id)
                .single()

            if (error && status !== 406) throw error

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            if (error instanceof Error) Alert.alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, website, avatar_url }: { username: string; website: string; avatar_url: string }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
        } catch (error) {
            if (error instanceof Error) Alert.alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>

            <AvatarView
                size={150}
                url={avatarUrl}
                onUpload={(url: string) => {
                    setAvatarUrl(url)
                    updateProfile({ username, website, avatar_url: url })
                }}
            />

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={session?.user?.email}
                    editable={false}
                    style={styles.input}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    value={username || ''}
                    onChangeText={setUsername}
                    style={styles.input}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <Text style={styles.label}>Website</Text>
                <TextInput
                    value={website || ''}
                    onChangeText={setWebsite}
                    style={styles.input}
                />
            </View>

            <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() =>
                    updateProfile({ username, website, avatar_url: avatarUrl })
                }
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'Actualizar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={() => supabase.auth.signOut()}
            >
                <Text style={[styles.buttonText, { color: '#fff' }]}>
                    Cerrar sesión
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticallySpaced: {
        paddingTop: 6,
        paddingBottom: 6,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    input: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 15,
    },

    button: {
        marginTop: 20,
        paddingVertical: 14,
        width: '90%',
        borderRadius: 12,
        alignItems: 'center',
    },
    updateButton: {
        backgroundColor: '#e5e5ff',
        borderWidth: 1,
        borderColor: '#d3d3ff',
    },
    logoutButton: {
        backgroundColor: '#6a5acd',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    }
})
