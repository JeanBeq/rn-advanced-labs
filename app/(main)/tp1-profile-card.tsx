import { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';

export default function ProfileCard() {
    const [followers, setFollowers] = useState<number>(0);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const toggleFollow = () => {
        setFollowers(prev => {
            if (isFollowing) {
                return Math.max(0, prev - 1);
            }
            return prev + 1;
        });
        setIsFollowing(f => !f);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#ffffffff' }}>
                Big Cat
            </Text>
            <Image
                source={{ uri: 'https://cataas.com/cat' }}
                style={{ width: 200, height: 200, borderRadius: 12 }}
            />
            <Text style={{ fontSize: 16, marginTop: 10, color: '#ffffffff' }}>
                Fonction : Développeur Mobile
            </Text>
            <Text style={{ fontSize: 16, marginTop: 10, color: '#ffffffff' }}>
                Followers : {followers}
            </Text>
            <View style={{ marginTop: 12, width: 140 }}>
                <Button
                    title={isFollowing ? 'Unfollow' : 'Follow'}
                    onPress={toggleFollow}
                    accessibilityLabel={isFollowing ? 'Se désabonner' : 'Suivre ce profil'}
                />
            </View>
        </View>
    );
}