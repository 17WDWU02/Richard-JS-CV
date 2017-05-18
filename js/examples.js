//Get an Element By ID
var name = document.getElementById('Name');
console.log(name);

//Get Elements by tag Name
var list = document.getElementsByTagName('li');
console.log(list);

//Get Elements by Class Name
var items = document.getElementsByClassName('item');
console.log(items);

var firstItem = document.querySelector('ul li.item');
var AllItems = document.querySelectorAll('ul li.item');
console.log(firstItem);
console.log(AllItems);