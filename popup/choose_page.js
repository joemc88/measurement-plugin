function store_measurements(fieldName){
	if (storageAvailable('localStorage')) {
		var fieldValue = document.getElementById(fieldName).value;
		
		if(fieldValue != ""){
			var safeFieldValue = escape(fieldValue);
		        localStorage.setItem(fieldName, safeFieldValue);
		}
	}else{
		alert("Local Storage is not avalable");
	}
}


function populate_measurements(fieldName){
	if (storageAvailable('localStorage')) {
		var measurement = localStorage.getItem(fieldName);
		alert("setting vlalue");
		document.getElementById(fieldName).setAttribute('value', measurement);
	}
}

function getFieldNames(){
	var fieldNames = ["bust","blazerWaist","bottomHem","frontLength","shoulder","backLength","sleeveLength","pantWaist","inseam","pantLength"]
	return fieldNames;
}

document.getElementById('submit').addEventListener("click", function() {
	try{
	var fieldNames = getFieldNames();
	fieldNames.forEach(store_measurements);	
	fieldNames.forEach(populate_measurements);
	}catch(error){alert(error);}
});


function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
