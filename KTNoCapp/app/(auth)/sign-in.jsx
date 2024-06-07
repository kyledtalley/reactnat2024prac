import { View, Text, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import logo from "../../assets/images/KyDaTaLogoGold.png"

const Login = () => {
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Image source={logo} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Login
