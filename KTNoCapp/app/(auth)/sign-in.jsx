import {
	View,
	Text,
	Image,
	ScrollView,
	ImageBackground,
	StyleSheet,
	Alert,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import logo from "../../assets/images/KyDaTaLogoGold.png"
import FormField from "../../components/FormField"
import background from "../../assets/backgrounds/coolbackgroundLogin.jpg"
import CustomButton from "../../components/CustomButton"
import { Link } from "expo-router"
import { signIn } from "../../lib/appwrite"

const Login = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill in all fields")
		}

		setIsSubmitting(true)

		try {
			await signIn(form.email, form.password, form.username)

			router.replace("/home")
		} catch (error) {
			Alert.alert("Error", error.message)
		} finally {
			setIsSubmitting(false)
		}

		createUser()
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ImageBackground
				source={background}
				resizeMode="cover"
				style={StyleSheet.absoluteFillObject}
			>
				<ScrollView>
					<View
						className="w-full flex justify-center items-center h-full px-4"
						style={{ minHeight: "100%" }} // Corrected the style property
					>
						<View
							style={{
								position: "absolute",
							}}
						>
							<Image
								source={logo}
								style={{
									width: 200, // Adjust size as needed
									height: 200, // Adjust size as needed
								}}
								resizeMode="contain"
							/>

							<Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
								Log in to Kydata
							</Text>

							<FormField
								title="Email"
								value={form.email} // Corrected the value prop
								handleChangeText={(e) =>
									setForm({ ...form, email: e })
								}
								otherStyles="mt-7"
								keyboardType="email-address"
							/>
							<FormField
								title="Password"
								value={form.password} // Corrected the value prop
								handleChangeText={(e) =>
									setForm({ ...form, password: e })
								}
								otherStyles="mt-7"
							/>

							<CustomButton
								title="Log in"
								handlePress={() => {
									console.log(form)
								}}
								containerStyles="mt-7"
								isLoading={isSubmitting}
							/>

							<View className="justify-center pt-5 flex-row gap-2">
								<Text className="text-white">
									Already have an account?{" "}
								</Text>
								<Link
									href="/sign-up"
									className="font-psemibold text-secondary"
								>
									Sign Up
								</Link>
							</View>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}

export default Login
