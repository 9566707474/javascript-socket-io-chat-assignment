const channelsList = [];
function sendMessage(event, socket) {
	event.preventDefault();
	let message = document.getElementById('message').value;
	let channel = document.getElementById('channel').value;
	let username = document.getElementById('username').value;
	if (channel == '') {
		return;
	}
	let cont = document.getElementById('chatContainer');
	let child1 = document.createElement('div');
	child1.className = 'col-12';
	cont.insertBefore(child1, cont.childNodes[0]);
	let child2 = document.createElement('div');
	child2.classList.add('card');
	child2.classList.add('sent-message');
	child1.appendChild(child2);
	let child3 = document.createElement('div');
	child3.className = 'card-body';
	child2.appendChild(child3);
	let child4 = document.createElement('p');
	child4.className = 'card-text';
	child3.appendChild(child4);
	child4.innerHTML = 'Me : ' + message;
	socket.emit('message', { username, channel, message });
}

function joinChannel(event, socket) {
	let channel = document.getElementById('newchannel').value;
	socket.emit('joinChannel', { channel });
}

function leaveChannel(event, socket) {
	let channel = document.getElementById('newchannel').value;
	socket.emit('leaveChannel', { channel });
}

function onWelcomeMessageReceived(message) {
	let cont = document.getElementById('chatContainer');
	let child1 = document.createElement('div');
	child1.className = 'col-12';
	cont.insertBefore(child1, cont.childNodes[0]);
	let child2 = document.createElement('div');
	child2.classList.add('card');
	child2.classList.add('received-message');
	child1.appendChild(child2);
	let child3 = document.createElement('div');
	child3.className = 'card-body';
	child2.appendChild(child3);
	let child4 = document.createElement('p');
	child4.className = 'card-text';
	child3.appendChild(child4);
	child4.innerHTML = 'System : ' + message;
}

function onNewMessageReceived(data) {
	let cont = document.getElementById('chatContainer');
	let child1 = document.createElement('div');
	child1.className = 'col-12';
	cont.insertBefore(child1, cont.childNodes[0]);
	let child2 = document.createElement('div');
	child2.classList.add('card');
	child2.classList.add('received-message');
	child1.appendChild(child2);
	let child3 = document.createElement('div');
	child3.className = 'card-body';
	child2.appendChild(child3);
	let child4 = document.createElement('p');
	child4.className = 'card-text';
	child3.appendChild(child4);
	child4.innerHTML = data.username + ' : ' + data.message;
}

function onAddedToNewChannelReceived(data) {
	let cont = channelsList.find(x => x == data.channel);
	if (!cont) {
		channelsList.push(data.channel);
		let options=document.getElementById('channelsList').innerHTML; 
		options+='<option>'+data.channel+'</option>';
		document.getElementById('channelsList').innerHTML=options;
	}
	//document.getElementById('channelsList').innerHTML = data.channel;
	document.getElementById('alertContainer').innerHTML = 'You are added to <strong>' + data.channel + '</strong> successfully!';
}

function onRemovedFromChannelReceived(data) {
	document.getElementById('alertContainer').innerHTML = 'You are removed from <strong>' + data.channel + '</strong> successfully!';
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};


// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

