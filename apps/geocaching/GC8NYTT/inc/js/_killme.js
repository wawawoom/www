//   if (window.requestIdleCallback) {
//     requestIdleCallback(function () {
//         Fingerprint2.get(function (components) {
//           console.log(components) // an array of components: {key: ..., value: ...}
//         })
//     })
// } else {
//     setTimeout(function () {
//         Fingerprint2.get(function (components) {
//           console.log(components) // an array of components: {key: ..., value: ...}
//         })  
//     }, 500)
// }

    /*
  console.log(navigator.geolocation);
	

  document.getElementById('test').innerHTML = '----' + JSON.stringify(navigator.geolocation);
  
  if ("geolocation" in navigator) {
	alert('ici');	
    //document.getElementById('test').innerHTML = JSON.stringify(navigator);
    
    navigator.geolocation.getCurrentPosition(
function(position) {
      alert(position.coords.latitude, position.coords.longitude);
    }
, null, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    
  } else {
    alert('geolocation is not available in your phone');
  }
  */