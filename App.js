import { useEffect } from 'react';
import {
	Button,
	StyleSheet,
	View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av'; // https://docs.expo.dev/versions/latest/sdk/av/

let sound;

export default function App() {

	const play = async () => {
			await sound.playAsync();
		},
		pause = async () => {
			await sound.pauseAsync();
		};

	useEffect(() => {
		(async () => {
			
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				allowsRecordingIOS: false,
				staysActiveInBackground: true,
				shouldDuckAndroid: true,
				playThroughEarpieceAndroid: true,
			})
			.catch((error) => {
				console.log('setAudioModeAsync error', error);
			});

			const playbackObject = await Audio.Sound.createAsync(
				require('./assets/sample.mp3'),
				{
					shouldPlay: false,
					rate: 1,
					shouldCorrectPitch: true,
					pitchCorrectionQuality: Audio.PitchCorrectionQuality.High,
					volume: 1.0,
					isMuted: false,
					isLooping: false,
				},
				null,
				true
			);
			playbackObject.sound.setOnPlaybackStatusUpdate((status) => {
				console.log('setOnPlaybackStatusUpdate', status);
			});
			playbackObject.sound.setProgressUpdateIntervalAsync(100);
			sound = playbackObject.sound;

		})();
	}, [])

	return (
		<View style={styles.container}>
			<Button
				onPress={play}
				title="Play"
			/>
			<Button
				onPress={pause}
				title="Pause"
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});