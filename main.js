/**
 * Initial setup for ipAddress object in firebase and functions
 * to increment visit and client clicks count
 */
var visits = null;
var clientClicks = null;
var ipAddress = null;

var setInitialStats = (incrementVisits) => {
    firebase.database().ref('ipAddresses/' + ipAddress + '/visits').once('value').then(function(snapshot){
        visits = snapshot.val();
        incrementVisits();
    });
    firebase.database().ref('ipAddresses/' + ipAddress + '/clicks').once('value').then(function(snapshot){
        clientClicks = snapshot.val();
    });
}

var incrementVisits = () => { 
    firebase.database().ref('ipAddresses/' + ipAddress + '/visits').set(
        visits = (visits + 1) || 1
    );
}

var incrementClientClicks = () => {
    clientClicks += 1
    firebase.database().ref('ipAddresses/' + ipAddress + '/clicks').set(
        clicks = clientClicks
    )
}

/**
 * Getting ip address of client who visited and incrementing
 * visit count
 */
var request = new XMLHttpRequest();
var API_URL = 'https://api.ipdata.co/ip?api-key=4d52639d5af7770d42c53fe002b5b0ec80922dd9ac4fe84de2bbe35c';

request.open('GET', API_URL);

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
 if (this.readyState === 4) {
    ipAddress = this.responseText.replace(/\./g, '-');
    setInitialStats(incrementVisits);
 }
};

request.send();


/**
 * Initial setup to get reference for firebase value of clicks and
 * ip addresses
 */
var clicksRef = firebase.database().ref("clicks");

clicksRef.once('value').then(function(snapshot){
    document.getElementById("clicks").innerHTML = snapshot.val();
});

clicksRef.on("value", function(snapshot) {
    document.getElementById("clicks").innerHTML = snapshot.val();
});

/**
 * Function used to increment the click count and sets the value
 * in Firebase database
 */
var front = true;

var incrementClicks = () => {
    if (front) {
        var clicks = parseInt(document.getElementById("clicks").innerHTML);
        clicks += 1;
    
        // Update counts in databse and html
        clicksRef.set(clicks = clicks);
        document.getElementById("clicks").innerHTML = clicks;

        incrementClientClicks();
        front = false;
    } else {
        front = true;
    }
}

/**
 * Function that flips the card
 */
var card = document.querySelector('.card');

card.addEventListener("click", function() {
  card.classList.toggle('is-flipped');

  incrementClicks();
});