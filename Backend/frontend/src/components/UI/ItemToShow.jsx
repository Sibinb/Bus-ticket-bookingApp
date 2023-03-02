import React from 'react'
import Amenites from './Amenites'
import BusPhotos from './BusPhotos';
import Review from './Review';
import Stops from './Stops';

function ItemToShow({target}) {
    switch(target){
        case "amenities":
            return <Amenites/>
        case 'Bus_pics':
            return <BusPhotos/>
        case 'stops':
            return <Stops/>
        case 'review':
            return <Review/>
        default : return '';
    }
}

export default ItemToShow