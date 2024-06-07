import { StatusBar } from "expo-status-bar"
import { Redirect, router } from "expo-router"
import {
	View,
	Text,
	Image,
	ScrollView,
	ImageBackground,
	StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import logo from "../assets/images/KyDaTaLogoGold.png"
import cards from "../assets/images/smokingiscool.jpg"
import path from "../assets/images/path.png"
import background from "../assets/coolbackground.jpg"

import { Loader } from "../components/Loader.jsx"
import { useGlobalContext } from "../context/GlobalProvider"
import CustomButton from "../components/CustomButton.jsx"

const Welcome = () => {
	// const { loading, isLogged } = useGlobalContext()

	// if (!loading && isLogged) return <Redirect href="/home" />

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ImageBackground
				source={background}
				resizeMode="cover"
				style={StyleSheet.absoluteFillObject}
			>
				<ScrollView
					contentContainerStyle={{
						height: "100%",
					}}
				>
					<View
						className="w-full flex justify-center items-center min-h-[85vh] px-4"
						style={{ marginTop: 75 }} // Adjust the marginTop as needed
					>
						<View
							style={{
								position: "absolute",
								top: 20, // Adjust as needed
								left: 20, // Adjust as needed
							}}
						>
							<Image
								source={logo}
								style={{
									width: 50, // Adjust size as needed
									height: 50, // Adjust size as needed
								}}
								resizeMode="contain"
							/>
						</View>

						<View
							style={{
								width: "100%",
								maxWidth: 380,
								height: 298,
								shadowColor: "#fff",
								shadowOffset: { width: 0, height: 0 },
								shadowOpacity: 0.4,
								shadowRadius: 20, // Increased shadowRadius
								elevation: 20, // Increased elevation for Android
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Image
								source={cards}
								style={{
									width: "100%",
									height: "100%",
								}}
								resizeMode="contain"
							/>
						</View>

						<View className="relative mt-5">
							<Text className="text-3xl text-white font-bold text-center">
								Discover Endless{"\n"}
								Possibilities with{" "}
								<Text className="text-amber-200">Kydata</Text>
							</Text>
						</View>
						<View className="relative  justify-center items-center">
							<View
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark transparent background
									padding: 10, // Add padding for better spacing
									borderRadius: 10, // Optional: Add border radius for rounded corners
									marginTop: 20, // Adjust margin as needed
								}}
							>
								<Text className="text-sm font-pregular text-white text-center">
									Where Creativity Meets Innovation: Embark on
									a Journey of Limitless Exploration with
									Kydata
								</Text>
							</View>

							<CustomButton
								title="Continue with Email"
								handlePress={() => router.push("/sign-in")}
								containerStyles="w-full mt-7"
							/>
						</View>
					</View>
				</ScrollView>

				<StatusBar backgroundColor="#161622" style="light" />
			</ImageBackground>
		</SafeAreaView>
	)
}

export default Welcome
