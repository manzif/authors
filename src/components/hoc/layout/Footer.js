import React from 'react';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <p>Authors&apos; Heaven, Copyright &copy; {year}</p>
    </footer>
  );
};

export default Footer;
