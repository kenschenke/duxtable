import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';
import faStarHalf from '@fortawesome/fontawesome-free-solid/faStarHalf';

export const makeAddresses = () => {
    // generate a random number of address records between 2,000 and 5,000 of them.
    const num = Math.floor(Math.random() * 3000) + 2000;
    const directions = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const streets = ['Second', 'Third', 'First', 'Fourth', 'Park', 'Fifth', 'Main', 'Sixth', 'Oak', 'Seventh',
        'Pine', 'Maple', 'Cedar', 'Eighth', 'Elm', 'View', 'Washington', 'Ninth', 'Lake', 'Hill'
    ];
    const streetTypes = ['Ave', 'Blvd', 'Cir', 'Ct', 'Dr', 'Ln', 'Pkwy', 'Pl', 'St', 'Ter', 'Trl', 'Way'];
    const names = ['Group', 'Energy', 'International', 'Financial', 'Holdings', 'Health', 'Services', 'Insurance',
        'Corp.', 'Foods', 'General', 'Resources', 'American', 'United', 'Systems', 'Communications', 'Stores',
        'Automotive', 'Data', 'Holding', 'America'
    ];
    const cities = [
        'Washington', 'Springfield', 'Franklin', 'Greenville', 'Bristol', 'Clinton', 'Fairview', 'Salem', 'Madison',
        'Georgetown', 'Arlington', 'Chester', 'Fairfield', 'Kingston', 'Marion', 'Riverside', 'Jackson',
        'Oxford', 'Centerville', 'Clayton', 'Milford', 'Winchester', 'Hudson'
    ];
    const states = [
        'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
        'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
        'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
        'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
        'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
    ];

    let addrs = [];
    for (let i = 0; i < num; i++) {
        // random house number between 100 and 19999
        const num = Math.floor(Math.random() * 19899) + 100;
        const direction = randomArrayValue(directions);
        const street = randomArrayValue(streets);
        const streetType = randomArrayValue(streetTypes);
        const rating = Math.floor(Math.random() * 10) / 2;  // Number between .5 and 5 (in .5 increments)

        addrs.push({
            Id: i  + 1,
            Name: randomArrayValue(names) + ' ' + randomArrayValue(names),
            Addr: `${num} ${direction} ${street} ${streetType}`,
            CitySt: randomArrayValue(cities) + ', ' + randomArrayValue(states),
            Rating: rating
        });
    }

    return addrs;
};

export const makeStars = rating => {
    let stars = [];

    while (rating > 0) {
        if (rating >= 1.0) {
            stars.push(<FontAwesomeIcon key={rating} icon={faStar} className="mr-2" style={{fontSize:12}}/>);
        } else if (rating < 1) {
            stars.push(<FontAwesomeIcon key={rating} icon={faStarHalf} className="mr-2" style={{fontSize:12}}/>);
        }

        rating -= 1.0;
    }

    return stars;
};

const randomArrayValue = array => {
    return array[Math.floor(Math.random() * array.length)];
};

