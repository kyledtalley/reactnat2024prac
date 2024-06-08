import { useState } from "react"
import { Link, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Dimensions,
	Alert,
	Image,
	ImageBackground,
} from "react-native"

import { images } from "../../constants"
import { createUser } from "../../lib/appwrite"
import { CustomButton, FormField } from "../../components"
import { useGlobalContext } from "../../context/GlobalProvider"

import background from "../../assets/backgrounds/coolbackgroundLogin.jpg"
import logo from "../../assets/images/KyDaTaLogoGold.png"

const SignUp = () => {
	const { setUser, setIsLogged } = useGlobalContext()

	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submit = async () => {
		if (form.username === "" || form.email === "" || form.password === "") {
			Alert.alert("Error", "Please fill in all fields")
		}

		setIsSubmitting(true)
		try {
			const result = await createUser(
				form.email,
				form.password,
				form.username
			)
			setUser(result)
			setIsLogged(true)

			router.replace("/home")
		} catch (error) {
			Alert.alert("Error", error.message)
		} finally {
			setIsSubmitting(false)
		}
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
								Sign Up for Kydata
							</Text>
							<FormField
								title="Username"
								value={form.username} // Corrected the value prop
								handleChangeText={(e) =>
									setForm({ ...form, username: e })
								}
								otherStyles="mt-7"
							/>
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
								title="Sign Up"
								handlePress={submit}
								containerStyles="mt-7"
								isLoading={isSubmitting}
							/>
							<View className="justify-center pt-5 flex-row gap-2">
								<Text className="text-white">
									Already have an account?{" "}
								</Text>
								<Link
									href="/sign-in"
									className="font-psemibold text-secondary"
								>
									Sign In
								</Link>
							</View>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}

export default SignUp
