import './Footer.scss';

function Footer() {
  return (
    <div className="Footer">
      App hand-coded by <strong>Jared Duncan</strong>
      {' using '}
      <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a>
      {' and '}
      <a href="https://material-ui.com/" target="_blank" rel="noreferrer">Material UI</a>
    </div>
  );
}

export default Footer;