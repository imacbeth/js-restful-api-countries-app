const Request = function (url) {
  this.url = url;
}

Request.prototype.get = function (onComplete) {
  // built in class to allow requests from front end
  const xhr = new XMLHttpRequest();
  // have to open the request
  xhr.open('GET', this.url);
  // changes from html default - to say what type of data want back
  xhr.setRequestHeader('Accept', 'application/json');
  // ok send request to the api
  xhr.send();

// need event listener to ensure dont try to access data until it is loaded as would get errors
  xhr.addEventListener('load', () => {
    // request could complet but with a 404 so only continue if we have 200
    if (xhr.status !== 200) {
      return;
    }
    // response text is the  property on the data we receive
    const jsonString = xhr.responseText;
    // data will come back as string, need to convert to JS objects - unwrapping
    const data = JSON.parse(jsonString);
    onComplete(data);
  });
};

module.exports = Request;
