import React, { useEffect, useState } from 'react';
import { fetchNeighborhoods } from '../api';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
// import { StandaloneSearchBox } from '@react-google-maps/api/components/places/StandaloneSearchBox';



import '../styles/neighbourhoods.css';


const mapContainerStyle = {
  width: '100%',
  height: '800px',
};

const defaultCenter = {
  lat: 49.8951,
  lng: -97.1384,
};


const Neighbourhoods = () => {
  const [communities, setCommunities] = useState([]);
  const [sortBy, setSortBy] = useState('count');
  const [map, setMap] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [searchBoxRef, setSearchBoxRef] = useState(null);
  const [searchInput, setSearchInput] = useState("");


  function handleNeighborhoodClick(neighborhood) {
    setSelectedNeighborhood(neighborhood);
    const searchString = `${neighborhood.neighName}, Winnipeg, MB`;
    setSearchInput(searchString);
    searchPlace(searchString);
  }


  const searchPlace = (place) => {
    if (searchBoxRef) {
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        query: place,
        fields: ['geometry'],
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const firstPlace = results[0];

          map.panTo(firstPlace.geometry.location);
          map.setZoom(15);
        }
      });
    }
  };


  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onPlacesChanged = () => {
    if (searchBoxRef) {
      const places = searchBoxRef.getPlaces();
      if (places.length === 0) {
        return;
      }

      // Get the first place from the search result
      const firstPlace = places[0];

      // Set the map center to the first place's location
      map.panTo(firstPlace.geometry.location);
      map.setZoom(14);
    }
  };


  function processNeighborhoods(data) {
    const communityMap = new Map();

    data.forEach((n) => {
      const communityKey = n.commName;

      if (communityMap.has(communityKey)) {
        communityMap.get(communityKey).count += n.count;

        const neighborhoodIndex = communityMap
          .get(communityKey)
          .neighborhoods.findIndex(
            (neighborhood) => neighborhood.neighName === n.neighName
          );

        if (neighborhoodIndex >= 0) {
          communityMap
            .get(communityKey)
            .neighborhoods[neighborhoodIndex].count += n.count;
        } else {
          communityMap.get(communityKey).neighborhoods.push({
            neighName: n.neighName,
            count: n.count,
            latitude: n.latitude, // Add latitude property
            longitude: n.longitude // Add longitude property
          });
        }
      } else {
        communityMap.set(communityKey, {
          commName: n.commName,
          count: n.count,
          neighborhoods: [{ neighName: n.neighName, count: n.count }],
        });
      }
    });

    const communitiesArray = Array.from(communityMap.values()).map((community) => {
      const neighborhoods = community.neighborhoods.sort((a, b) => b.count - a.count);
      return { ...community, neighborhoods };
    }).sort((a, b) => b.count - a.count);

    return communitiesArray;
  }


  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchNeighborhoods();
        const processedData = processNeighborhoods(data);
        setCommunities(processedData);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="neighbourhoods">
      <h2>Neighborhoods</h2>
      <div className="neighbourhoods-container">
        <div className="neighbourhoods-list">
          {/* <SortSelector sortBy={sortBy} onSortChange={handleSortChange} /> */}
          {/* Pass setSelectedNeighborhood to the NeighborhoodList component */}
          <NeighborhoodList communities={communities} onNeighborhoodClick={handleNeighborhoodClick} />
          <SourceLink />
        </div>
        <NeighborhoodMap
          selectedNeighborhood={selectedNeighborhood}
          defaultCenter={defaultCenter}
          onLoad={onLoad}
          setSearchBoxRef={setSearchBoxRef}
          onPlacesChanged={onPlacesChanged}
          searchInput={searchInput} // Pass searchInput as a prop
          setSearchInput={setSearchInput} // Pass setSearchInput as a prop
        />

      </div>
    </div>
  );

};

const SortSelector = ({ sortBy, onSortChange }) => (
  <div>
    <label htmlFor="sort">Sort by: </label>
    <select id="sort" value={sortBy} onChange={onSortChange}>
      <option value="count">Crime count</option>
    </select>
  </div>
);

const NeighborhoodList = ({ communities, onNeighborhoodClick }) => (
  <ul>
    {communities.map((community) => (
      <li key={community.commName}>
        {community.commName} - Total Crime count: {community.count}
        <ul>
          {community.neighborhoods.map((neighborhood) => (
            <li
              key={neighborhood.neighName}
              onClick={() => onNeighborhoodClick(neighborhood)}
            >
              {neighborhood.neighName} - Crime count: {neighborhood.count}
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);


const SourceLink = () => (
  <p>
    Link to source:{" "}
    <a href="https://public.tableau.com/shared/2KSYG33H3?:display_count=n&:origin=viz_share_link">
      here
    </a>
  </p>
);



const NeighborhoodMap = ({ selectedNeighborhood, defaultCenter, onLoad, setSearchBoxRef, onPlacesChanged, searchInput, setSearchInput }) => (
  <div className="map-container">
    <LoadScript
      googleMapsApiKey={"AIzaSyBiZIYqnEseH7n7f1jXZTbjarwTG5QqZ44"}
      libraries={["places"]} // Add "places" library to LoadScript
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={defaultCenter}
        onLoad={onLoad}
      >
      </GoogleMap>
      {/* Move the StandaloneSearchBox outside the GoogleMap component */}
      <div className="search-box">
      <StandaloneSearchBox
        onLoad={(ref) => setSearchBoxRef(ref)}
        onPlacesChanged={onPlacesChanged}
      >
          <input
      type="text"
      placeholder="Search location"
      value={searchInput} // Use the searchInput prop
      onChange={(e) => setSearchInput(e.target.value)}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `10px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
          }}
        />
      </StandaloneSearchBox>
      </div>
    </LoadScript>
  </div>
);




export default Neighbourhoods;