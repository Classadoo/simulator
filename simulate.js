require('./Util.js');
var Firebase = require('firebase');
var argv = require('minimist')(process.argv.slice(2));
var faker = require('faker');

process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('uncaughtException', cleanUp);

var numberOfStudents = argv.n || 10;
var propsToChange = argv._;
var changeReadOnly = argv.r;

var readOnlyProps = {	
	promptHint: boolean,
	hintAllowed: boolean,
	lockScratch: boolean,
	needsHelp: boolean, 
	showHint: boolean,
	xray: boolean,
	doScreenshot: boolean, 
	doScreenshare: boolean				
}

var globalProps = {	 
	taskIndex: boolean,	
	chatOpen: boolean,
	scratchPreviewShown: boolean,	 	
	chatHistory: chatHistory,
	stopIndex: numeric,
	startTime: timestamp, 	
	taskNames: wordArray,	
	backSyncClick: backSyncClick,
	screenshot: screenshot	
}

var tabProps = {	
	toolbarOpen: boolean,
	active: boolean,
	remoteRefresh: boolean	
	url: url	
}

var classProps = {
	syncedScratchInput: text,
	syncingScratch: boolean
};  

function update(studentRef, prop, val) {
	var updateObj[] = {};
	updateObj[prop] = val;
	studentRef.update(updateObj)
}

function text(studentRef, prop) {
	update(studentRef, prop, faker.lorem.paragraph());	
}

function boolean(studentRef, prop) {
	update(studentRef, prop, Math.random() < .5);		
}

function numeric(studentRef, prop) {
	update(studentRef, prop, Math.random(0,10));
}

function timestamp(studentRef, prop) {
	update(studentRef, prop, Date.now());		
} 	

function chatHistory(studentRef) {
	var chatObj = {text: faker.lorem.sentence(), timestamp: Firebase.ServerValue.TIMESTAMP, isStudent: Math.random() < .5}
	studentRef.child("chatHistory").push(chatObj);		
} 	

function wordArray(studentRef, prop) {
	update(studentRef, prop, randomWords(10));
}

function backSyncClick(studentRef) {
	studentRef.update({backSyncClick: {index: Math.random(0,300), x: Math.random(0,700), y: Math.random(0,700), timestamp: Date.now()}});		
}

function screenshot(studentRef) {
	studentRef.update({screenshot: {img: faker.image.imageUrl(1440, 900)}});		
}

var parentRef =  new Firebase('https://classadoo-dev.firebaseIO.com/');
var usersRef = parentRef.child("users")
var classRef = parentRef.child("class")
var studentRefs = new Set([])

for (var i = 0; i < numberOfStudents; i++) {
	var clientId = Util.guid()
	var studentRef = usersRef.child(clientId)
	joinClass(studentRef);
	studentRefs.add(studentRef);
}

var timeOffset = 0
function startChanges() {
	studentRefs.forEach(function() {
		setTimeout()
	})
}

function changeData(studentRef) {
	return function() {
		// studentRef.update()
	}
}

function leaveClass(studentRef) {
	studentRef.remove()
}

function joinClass(studentRef) {
	studentRef.set(
		{
			lessonName: "test lesson",
	 		"studentName": studentRef.key().slice(0,10),
	  		"taskIndex": 0
	  	}
	)
}

function remove(ref) {
	return new Promise(function(fulfill, reject) {
		ref.remove(function() {
			fulfill()
		});	
	})
}

function cleanUp(err) {
	// remove all the data	
	Promise.when([remove(usersRef), remove(classRef)]).then(function() {
		process.exit();
	})
}