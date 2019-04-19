// Listen for form submit 
document.getElementById('basicForm').addEventListener('submit', saveBookmark);

function validateForm(websiteName, websiteURL) {
    if (!websiteName || !websiteURL) {
        alert('Please fill the form first');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!websiteURL.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

function saveBookmark(e) {
    // Get form values
    var websiteName = document.getElementById('websiteName').value;
    var websiteURL = document.getElementById('websiteURL').value;
    // console.log(websiteName, websiteURL);

    if(!validateForm(websiteName, websiteURL)){
        return false;
    }

    var bookmark = {
        name: websiteName,
        url: websiteURL
    }
    // console.log(bookmark);

    /*
         // Local storage test
         localStorage.setItem('test', 'Hello World!');
         console.log(localStorage.getItem('test'));
         localStorage.removeItem('test');
         console.log(localStorage.getItem('test'));
    */

    // Test if bookmarks array exists
    if (localStorage.getItem('bookmarks') === null) {

        // Initialize bookmarks array
        var bookmarks = [];

        // Add to array
        bookmarks.push(bookmark);

        // Set to local storage         JSON.stringify converts JSON object into a string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        // Fetch from local storage     JSON.parse converts string to JSON
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Add new bookmar to array
        bookmarks.push(bookmark);

        // Reset back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    // Clear form
    document.getElementById('basicForm').reset();

    // Refetch bookmarks
    fetchBookmarks();

    // console.log('Submit clicked!');
    // Prevent form from submitting
    e.preventDefault();
}

// Deleting Bookmarks
function deleteBookmark(url) {
    // console.log(url);

    // Fetch from local storage     JSON.parse converts string to JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Loop through the bookmarks 

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove the selected bookmark
            bookmarks.splice(i, 1);
        }
    }

    // Reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Refetch bookmarks
    fetchBookmarks();

}


// Function to fetch bookmarks
function fetchBookmarks() {
    // Fetch from local storage     JSON.parse converts string to JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // console.log(bookmarks);

    // Get the outputs in the results div
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        // alert(url);

        bookmarksResults.innerHTML += '<div class="card card-body                                           bg-light">' +
            '<h3>' + name +
            ' <a onclick = "deleteBookmark(\'' + url + '\')" class="float-right btn btn-danger" href = "#"> Delete </a> ' +
            ' <a class="float-centre btn btn-primary" target="_blank" href = "' + url + '"> Visit </a> ' +
            '</h3' +
            '</div>' + '<br>';

    }

}