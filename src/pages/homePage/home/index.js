import React from 'react';
import './styles.scss';

const Home = () => {
  return (
    <div className='homepage'>
      <div className='left-part'>
        <h4>Clothes <br/>Designer</h4>
        <div className='lower'>
          <h3>----- New</h3>
          <h1>Urban <br/>Collection</h1>
          <p>
            Collection of youth elongated T-shirts blabla
            bla blalalla lalal allalala la lsdaf lsldaflsdf 
            lsadkf
          </p>
          <button className='see-button'>
            SEE COLLECTION ---
          </button>
        </div>
      </div>
      <img src="http://localhost:5000/0e2cd675e52cacec70523aaf9a0ad8c5.jpg" alt="homepagePoster" />
    </div>
  );
}

export default Home;
