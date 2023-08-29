import React from 'react';
import "./ContactUs.css"
const ContactUs = () => {
  return (
    <div className="body" style={{ minHeight: "100vh" }}>
    <div className="contact-us-page">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, feel free to reach out to us.</p>
        <div className="contact-details">
          <div className="contact-item">
            <i className="fa fa-map-marker"></i>
            <p>123 Main Street, City, Country</p>
          </div>
          <div className="contact-item">
            <i className="fa fa-phone"></i>
            <p>+1 123-456-7890</p>
          </div>
          <div className="contact-item">
            <i className="fa fa-envelope"></i>
            <p>info@example.com</p>
          </div>
        </div>
      </div>
      <div className="map-section">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60506.72209879229!2d73.6356921582031!3d18.588904700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb7d0345f01f%3A0x6e8c20c647a06f47!2sSunbeam%20Infotech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1693160818145!5m2!1sen!2sin" style={{width : "600", height :"450" , border : "0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    </div>
  );
}

export default ContactUs;
