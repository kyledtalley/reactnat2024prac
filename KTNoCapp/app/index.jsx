import { StatusBar } from "expo-status-bar"
import "react-native-url-polyfill/auto"
import { Redirect, router } from "expo-router"
import {
	View,
	Text,
	Image,
	ScrollView,
	ImageBackground,
	StyleSheet,
	Animated, // Import Animated
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useRef } from "react"

import logo from "../assets/images/KyDaTaLogoGold.png"
import cards from "../assets/images/smokingiscool.jpg"
import path from "../assets/images/path.png"
import background from "../assets/backgrounds/coolbackground.jpg"

import { Loader } from "../components/Loader.jsx"
import { useGlobalContext } from "../context/GlobalProvider"
import CustomButton from "../components/CustomButton.jsx"
const Welcome = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current // Initial opacity value

	const handlePress = () => {
		// Fade out
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start(() => {
			// Navigate to sign-in and fade in
			router.push("/sign-in")
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}).start()
		})
	}

	return (
		<Animated.View style={{ flex: 1, opacity: fadeAnim }}>
			<SafeAreaView style={{ flex: 1 }}>
				<ImageBackground
					source={background}
					resizeMode="cover"
					style={StyleSheet.absoluteFillObject}
				>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View style={{ flex: 1 }}>
							<View
								style={{
									position: "absolute",
									top: 70,
									left: 0,
								}}
							>
								<Image
									source={logo}
									style={{ width: 75, height: 75 }}
								/>
							</View>
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center", // Center children horizontally
									paddingHorizontal: 20,
								}}
							>
								<View
									style={{
										position: "absolute",
										top: "35%", // Adjusted to be above the text
										shadowColor: "#39effc", // Light blue shadow color
										shadowOffset: {
											width: 0,
											height: 0,
										},
										shadowOpacity: 0.8,
										shadowRadius: 20,
										elevation: 10,
									}}
								>
									<Image
										source={cards}
										style={{
											width: 250,
											height: 300,
											borderRadius: 10, // Optional: Add border radius for rounded corners
											top: "-50%", // Adjusted to be higher up
											shadowColor: "#39effc", // Light blue shadow color
											shadowOffset: {
												width: 0,
												height: 0,
											},
											shadowOpacity: 0,
											shadowRadius: 30, // Increased for a more pronounced glow effect
											elevation: 10,
										}}
										resizeMode="contain"
									/>
								</View>
								<View
									style={{
										position: "absolute",
										top: "59%", // Adjusted down by 20px
										transform: [
											{ translateY: -50 }, // Adjust based on text height
										],
									}}
								>
									<Text className="text-3xl text-white font-bold text-center">
										Discover Endless{"\n"}
										Possibilities with{" "}
										<Text className="text-amber-200">
											Kydata
										</Text>
									</Text>
								</View>
								<View
									style={{
										position: "absolute",
										top: "65%", // Adjusted down by 20px
										width: 300, // Adjust based on desired container width
										alignItems: "center",
									}}
								>
									<View
										style={{
											backgroundColor:
												"rgba(0, 0, 0, 0.5)", // Dark transparent background
											padding: 10, // Add padding for better spacing
											borderRadius: 10, // Optional: Add border radius for rounded corners
											marginBottom: 20, // Space between text and button
										}}
									>
										<Text className="text-sm font-pregular text-white text-center">
											Where Creativity Meets Innovation:
											Embark on a Journey of Limitless
											Exploration with Kydata
										</Text>
									</View>

									<CustomButton
										title="Sign In"
										handlePress={handlePress}
										containerStyles="mt-5"
									/>
								</View>
								<View
									style={{
										position: "absolute",
										bottom: 50,
										transform: [
											{ translateX: -150 }, // Adjust based on image width
										],
									}}
								></View>
							</View>
						</View>
					</ScrollView>
				</ImageBackground>
			</SafeAreaView>
		</Animated.View>
	)
}

export default Welcome
