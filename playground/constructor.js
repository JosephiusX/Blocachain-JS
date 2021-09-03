function User(firstName, lastName, age, gender) {
	this.firstName = firstName // in this case 'this' stands for the object created by the constructor
	this.lastName = lastName
	this.age = age
	this.gender = gender
}

var user1 = new User('John', 'Smith', 26, 'male')
var user2 = new User('Jill', 'Robinson', 25, 'female')

// the prototype is an object that can be accessed by other objects to get needed information or  functionality
User.prototype.emailDomain = `@facebook.com` // this adds the email to __proto__
console.log(user2.emailDomain) // the prototype value will be available on the proto of every object created by this constructor

// adding method to prototype
User.prototype.getEmailAddress = function () {
	return this.firstName + this.lastName + this.emailDomain
}
console.log(user2.getEmailAddress()) // creates a email as directed by the function above
