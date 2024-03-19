import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

export const getaddress= async() => {
    let address= Geolocation.getCurrentPosition(info =>
    { 
      console.log(info,'add')
        let address =  getPhysicalAddress({
        latitude: info?.coords?.latitude,
        // latitude: -26.4390917,
        longitude: info?.coords?.longitude,
        // longitude: 133.281323,
      })
      console.log('addre',address)
    })
}
  

 export const getPhysicalAddress = (address) => {
    Geocoder.init('AIzaSyABy0de4oAU34qkNVvF4xiiVmvS9zdeiMY');

    setTimeout(() => {
      Geocoder.from(address)
        .then(json => {
          // console.log(json);
console.log('here',json)
          let index = json?.results[0]?.address_components?.length - 1;
          let location = json.results[0].address_components[index].short_name;
          if (/^\d+$/.test(location)) {
            location = json.results[0].address_components[index - 1].short_name;
          }
          // console.log('us', /^\d+$/.test(location));
        //   setInitialCountry(location?.toLowerCase());
        return location
        })
        .catch(error => {
          console.warn(error, 'error');
        })
        .finally(() => {
          // dispatch(setLoading(false));
        });
    }, 100);
  };