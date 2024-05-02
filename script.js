// Initialize Firebase
const config = {
	apiKey: 'YOUR_API_KEY',
	authDomain: 'YOUR_AUTH_DOMAIN',
	databaseURL: 'YOUR_DATABASE_URL',
	projectId: 'YOUR_PROJECT_ID',
	storageBucket: 'YOUR_STORAGE_BUCKET',
};
firebase.initializeApp(config);

// Get the database reference
const db = firebase.database();
const chatRef = db.ref('chat-messages');

// Add a new message to the chat log
document.getElementById('send').addEventListener('click', () => {
	const message = document.getElementById('message').value.trim();
	if (message !== '') {
		chatRef.push({ message: message });
		document.getElementById('message').value = '';
	}
});

// Listen for new messages and update the chat log
chatRef.on('child_added', (data) => {
	const messageHTML = `
		<div class="chat-message">
			<span>${data.val().message}</span>
		</div>
	`;
	document.getElementById('chat-messages').insertAdjacentHTML('beforeend', messageHTML);
});
