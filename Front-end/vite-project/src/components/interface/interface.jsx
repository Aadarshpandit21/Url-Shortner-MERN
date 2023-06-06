import React, { useState } from 'react';
import "./interface.css"
import axios from 'axios';

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/url/shorten', { longUrl });
      const data = response.data.data;
      console.log(data); 
      setShortUrl(data.shortUrl);
      setError(''); 
    } catch (error) {
      setError('Error occurred while shortening the URL');
      console.error(error); // Log the error to the console for debugging
    }
  };

  console.log(shortUrl); // Check the value of shortUrl in the console

  return (
    <>
    <h2>Url Shortner</h2>
    <div className='wholeBody'>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className='formClass'>
        <input
        className='inputClass'
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit" className='buttonClass'>Shorten</button>
      </form>
    </div>
    {shortUrl && (
      <div className="short-url-box">
        <p>Short URL:</p>
        <input type="text" value={shortUrl} className='readOnly' readOnly />
      </div>
    )}
    </>
  );
};

export default UrlForm;



//http://localhost:3002/url/shorten