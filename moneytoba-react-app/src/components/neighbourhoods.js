import React, { useEffect, useState } from 'react';
import { fetchNeighborhoods } from '../api';
import './neighbourhoods.css';

const Neighbourhoods = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  // const [height, setHeight] = useState('800px');
  const [sortBy, setSortBy] = useState('count');

  function sortNeighborhoods() {
    const sortedNeighborhoods = [...neighborhoods].sort((a, b) => {
      if (sortBy === 'count') {
        return b.count - a.count;
      }
      return 0;
    });
    setNeighborhoods(sortedNeighborhoods);
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    sortNeighborhoods();
  }, [sortBy]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchNeighborhoods();
        setNeighborhoods(data);
      } catch (error) {
        console.error('Error fetching neighborhoods:', error.message);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   const scriptElement = document.createElement('script');
  //   scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  //   document.body.appendChild(scriptElement);

  //   const divElement = document.getElementById('viz1682298237578');
  //   const vizElement = divElement.getElementsByTagName('object')[0];

  //   if (divElement.offsetWidth > 800) {
  //     vizElement.style.minHeight = '850px';
  //     vizElement.style.maxHeight = divElement.offsetWidth * 0.75 + 'px';
  //   } else if (divElement.offsetWidth > 500) {
  //     vizElement.style.minHeight = '850px';
  //     vizElement.style.maxHeight = divElement.offsetWidth * 0.75 + 'px';
  //   } else {
  //     vizElement.style.height = '1500px';
  //   }

  //   setHeight(vizElement.style.height);
  // }, []);

  return (
    <div className="neighbourhoods">
      <h2>Neighborhoods</h2>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="count">Crime count</option>
        </select>
      </div>
      <ul>
        {neighborhoods.map((neighborhood) => (
          <li key={neighborhood._id}>
            {neighborhood.commName} - {neighborhood.neighName} - Crime count: {neighborhood.count}
          </li>
        ))}
      </ul>
      {/*
    <div className="neighbourhoods">
      <div className="tableauPlaceholder" id="viz1682298237578" style={{ position: 'relative' }}>
        <noscript>
          <a href="#">
            <img alt=" " src="https://public.tableau.com/static/images/Cr/CrimeMaps_16527244424350/Rolling12MonthStatistics/1_rss.png" style={{ border: 'none' }} />
          </a>
        </noscript>
        <object className="tableauViz" style={{ width: '100%', height: height }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="path" value="views/CrimeMaps_16527244424350/Rolling12MonthStatistics?:language=en-US&amp;:embed=true" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https://public.tableau.com/static/images/Cr/CrimeMaps_16527244424350/Rolling12MonthStatistics/1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
        </object>
      </div>
    </div>
    */}
  </div>
  );
};

export default Neighbourhoods;
