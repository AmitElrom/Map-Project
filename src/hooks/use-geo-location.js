import { useEffect, useState } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {
            lat: "",
            lng: "",
        },
    });

    const onSuccess = (location) => {
        const {
            coords: { latitude: lat, longitude: lng },
        } = location;

        setLocation((prevLoc) => {
            return {
                ...prevLoc,
                loaded: true,
                coordinates: {
                    lat,
                    lng,
                },
            };
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        // check if the broswer supports 'geolocation' field object in 'navigator' browser object
        if (!navigator.geolocation) {
            onError({
                message: "Browser doesn't support geolocation",
            });
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }, []);

    return location;
};

export default useGeoLocation;
