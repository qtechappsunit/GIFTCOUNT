import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const signinWithGoogle = async () => {
    try {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '408144936156-69om6j1vrkt3eqshupscks8r84kjgdlr.apps.googleusercontent.com',
            // iosClientId:
            //   '756702538267-p7qbmov0e2id9omrtouu355f6n3go9se.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();

        const { idToken, user } = await GoogleSignin.signIn();
        const googleCredentials = firebase.auth.GoogleAuthProvider.credential(idToken);
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(
                currentUser.email,
            );

            if (signInMethods.includes('facebook.com')) {
                // If the user is already signed in with facebook, link the google credential
                await currentUser.linkWithCredential(googleCredentials);
                console.log('Google account linked successfully.');
            } else {
                console.log('object');
                await firebase.auth().signInWithCredential(googleCredentials);
            }
        } else {
            await firebase.auth().signInWithCredential(googleCredentials);
        }
        return user;
    } catch (err) {
        console.log('google signin error==>', err);
        return null;
    }
}
