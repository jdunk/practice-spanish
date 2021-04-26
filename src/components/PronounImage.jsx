import './PronounImage.scss';

const PronounImage = (props) => {
  return (
    <div className="PronounImage">
      <img src={props.src} alt="" style={{ boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)' }} />
    </div>
  );
};

export default PronounImage;
