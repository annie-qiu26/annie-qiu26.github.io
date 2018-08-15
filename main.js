/**
 * Initial setup to get reference for firebase value of clicks
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