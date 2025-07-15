import LogoImg from '../Logo.jpg';

export default function Logo({width = '100px'}) {
    return (
        <img 
            src={LogoImg} 
            alt="BlogNest Logo" 
            style={{ width, height: width, borderRadius: '50%', objectFit: 'cover', display: 'block' }} 
        />
    );
}