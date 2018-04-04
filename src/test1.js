var fm = new FetchManager(1)
let x = fm.add("https://dev.dpm.fagbokforlaget.no/streams/5abb85f34da57b0000003ea8/book.hpub", {}).then(response => console.log('Success1:', response)).catch((e) => console.error(e + " kurwa mac"));
let y = fm.add("https://dev.dpm.fagbokforlaget.no/streams1/5abb7dfa4da57b0000002810/book.hpub", {}).then((resp) => resp.blob()).then(response1 => {console.log('Success2:', response1)}).catch((e) => console.error(e + " error2"));
var z = fm.cancel(1);
fm.add("https://dev.dpm.fagbokforlaget.no/streams/5abb7dfa4da57b0000002810/book.hpub").then((resp) => resp.blob()).then(response => console.log('Success3:', response)).catch((e) => console.error(e + " error3"));
fm.add("https://dev.dpm.fagbokforlaget.no/streams1/5abb7dfa4da57b0000002810/book.hpub").then((resp) => resp.blob()).then(response => console.log('Success4:', response)).catch((e) => console.error(e + " error4"));
fm.add("https://dev.dpm.fagbokforlaget.no/streams/5abb7dfa4da57b0000002810/book.hpub").then((resp) => resp.blob()).then(response => console.log('Success5:', response)).catch((e) => console.error(e + " error5"));
fm.add("https://dev.dpm.fagbokforlaget.no/streams1/5abb7dfa4da57b0000002810/book.hpub").then((resp) => resp.blob()).then(response => console.log('Success6:', response)).catch((e) => console.error(e + " error6"));
fm.cancel(1).then(e => {console.log("cancel1")})
fm.cancel(88).then(e => {console.log('88')})
console.log("first status: " + fm.getStatus(1).name);
console.log("second status: " + fm.getStatus(2).name);
console.log("third status: " + fm.getStatus(3).name);


fm.add("https://dev.dpm.fagbokforlaget.no/api/publications/5abb85f34da57b0000003ea8", {}).then((r) => r.json()).then(response => console.log('Success1:', response)).catch((e) => console.error(e + " kurwa mac"));