
var list = [ 'h', 'e', 'l', 'l', 'o'];

var newList = list.map((currElement, index) => {
  console.log("The current iteration is: " + index);
  console.log("The current element is: " + currElement);
  console.log("\n");
return {index: index, elem:  currElement};
});
console.log(JSON.stringify(newList, null, 4) );

var mydict = {};
if (!mydict[12]) {
	mydict[12]=123;
}

if (!mydict['15']) {
	mydict['15'] = {isExpanded: true};
}

if (mydict['15']) {
	mydict['15'].isExpanded =  !mydict['15'].isExpanded;
}

if (mydict['15']) {
	mydict['15'].isExpanded =  !mydict['15'].isExpanded;
}

mydict['fff'] = "asdf"
var str="123";
mydict[str] = str
console.log(JSON.stringify(mydict, null, 4) );

process.exit(1);


var arr = ["asdf","appCodeName","call","java","savePreferences","screen","language","random","marginBottom"]

var newArr = [];
while(arr.length) newArr.push(arr.splice(0,3));

console.log(newArr)