import { Text, TouchableOpacity } from "react-native"

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			className={`bg-purple-400 rounded-xl min-h-[62px] min-w-[200px] flex justify-center items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
		>
			<Text className="text-primary font-psemibold text-lg">{title}</Text>
		</TouchableOpacity>
	)
}

export default CustomButton
