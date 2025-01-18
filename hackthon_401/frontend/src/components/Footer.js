import React from 'react';
import '../css/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="Footer">
        <p>&copy; {currentYear} JobSeeker. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;
