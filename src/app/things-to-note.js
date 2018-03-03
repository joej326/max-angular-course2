

// when you subscribe to 'params' there is nothing that can go wrong therefore the second (error) => {}
// argument isn't used

// also, params is a never-ending observable. Despite this, we apparently don't need to unsubscribe from it.
// we only need to unsubscribe non-angular observables such as our Subject. 