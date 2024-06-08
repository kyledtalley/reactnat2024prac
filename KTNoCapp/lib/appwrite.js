import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
} from "react-native-appwrite"

export const appWriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.kydata.mobile",
	projectId: "6663a2e80014216b802d",
	databaseId: "6663a40100033bfc9b92",
	userCollectionId: "6663a41b00133fcf1303",
	videoCollectionId: "6663a43a002b3c80851c",
	storageId: "6663a60d00065c2d45cd",
}

const client = new Client()

client
	.setEndpoint(appWriteConfig.endpoint)
	.setProject(appWriteConfig.projectId)
	.setPlatform(appWriteConfig.platform)

const account = new Account(client)
const storage = new Storage(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

// Register user
// Register user
export async function createUser(email, password, username) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		)

		if (!newAccount) throw Error

		const avatarUrl = avatars.getInitials(username)

		await signIn(email, password)

		const newUser = await databases.createDocument(
			appWriteConfig.databaseId,
			appWriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		)

		return newUser
	} catch (error) {
		throw new Error(error)
	}
}

// Sign In
export async function signIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(
			email,
			password
		)
		return session
	} catch (error) {
		console.error("Error during sign-in:", error)
		throw new Error(error.message || "An error occurred during sign-in")
	}
}

// Get Account
export async function getAccount() {
	try {
		const currentAccount = await account.get()

		return currentAccount
	} catch (error) {
		throw new Error(error)
	}
}

// Get Current User
export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount()
		if (!currentAccount) throw Error

		const currentUser = await databases.listDocuments(
			appWriteConfig.databaseId,
			appWriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		)

		if (!currentUser) throw Error

		return currentUser.documents[0]
	} catch (error) {
		console.log(error)
		return null
	}
}

// Sign Out
export async function signOut() {
	try {
		const session = await account.deleteSession("current")

		return session
	} catch (error) {
		throw new Error(error)
	}
}

// Upload File
export async function uploadFile(file, type) {
	if (!file) return

	const { mimeType, ...rest } = file
	const asset = { type: mimeType, ...rest }

	try {
		const uploadedFile = await storage.createFile(
			appWriteConfig.storageId,
			ID.unique(),
			asset
		)

		const fileUrl = await getFilePreview(uploadedFile.$id, type)
		return fileUrl
	} catch (error) {
		throw new Error(error)
	}
}

// Get File Preview
export async function getFilePreview(fileId, type) {
	let fileUrl

	try {
		if (type === "video") {
			fileUrl = storage.getFileView(appWriteConfig.storageId, fileId)
		} else if (type === "image") {
			fileUrl = storage.getFilePreview(
				appWriteConfig.storageId,
				fileId,
				2000,
				2000,
				"top",
				100
			)
		} else {
			throw new Error("Invalid file type")
		}

		if (!fileUrl) throw Error

		return fileUrl
	} catch (error) {
		throw new Error(error)
	}
}

// Create Video Post
export async function createVideoPost(form) {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, "image"),
			uploadFile(form.video, "video"),
		])

		const newPost = await databases.createDocument(
			appWriteConfig.databaseId,
			appWriteConfig.videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creator: form.userId,
			}
		)

		return newPost
	} catch (error) {
		throw new Error(error)
	}
}

// Get all video Posts
export async function getAllPosts() {
	try {
		const posts = await databases.listDocuments(
			appWriteConfig.databaseId,
			appWriteConfig.videoCollectionId
		)

		return posts.documents
	} catch (error) {
		throw new Error(error)
	}
}

// Get video posts created by user
export async function getUserPosts(userId) {
	try {
		const posts = await databases.listDocuments(
			appWriteConfig.databaseId,
			appWriteConfig.videoCollectionId,
			[Query.equal("creator", userId)]
		)

		return posts.documents
	} catch (error) {
		throw new Error(error)
	}
}

// Get video posts that matches search query
export async function searchPosts(query) {
	try {
		const posts = await databases.listDocuments(
			appWriteConfig.databaseId,
			appWriteConfig.videoCollectionId,
			[Query.search("title", query)]
		)

		if (!posts) throw new Error("Something went wrong")

		return posts.documents
	} catch (error) {
		throw new Error(error)
	}
}

// Get latest created video posts
export async function getLatestPosts() {
	try {
		const posts = await databases.listDocuments(
			appWriteConfig.databaseId,
			appWriteConfig.videoCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(7)]
		)

		return posts.documents
	} catch (error) {
		throw new Error(error)
	}
}
