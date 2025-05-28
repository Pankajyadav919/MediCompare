import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock,
  faPills,
  faHeartbeat
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faInstagram, 
  faTwitter, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';




const Footer = () => {
  const quickLinks = [
    'Medicine Database',
    'Price Comparison',
    'Side Effects',
    'Drug Interactions',
    'Pharmacies Near You'
  ];

  const healthResources = [
    'Dosage Guidelines',
    'Generic Alternatives',
    'Patient Reviews',
    'Clinical Studies',
    'Health Blog'
  ];

  const contactInfo = [
    { icon: faMapMarkerAlt, text: '123 Medical Plaza, Health District' },
    { icon: faPhone, text: '+1 (555) 987-6543' },
    { icon: faEnvelope, text: 'info@medicompare.com' },
    { icon: faClock, text: '24/7 Support Available' }
  ];

  const socialIcons = [
    { icon: faFacebookF, name: 'Facebook' },
    { icon: faInstagram, name: 'Instagram' },
    { icon: faTwitter, name: 'Twitter' },
    { icon: faLinkedinIn, name: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary to-[#002244] text-white pt-20 pb-8 mt-24 relative overflow-hidden">
      <div className="footer-bg-pattern absolute inset-0 opacity-10 pointer-events-none z-0">
        <FontAwesomeIcon 
          icon={faPills} 
          className="absolute text-gold text-8xl top-1/4 left-1/4" 
        />
        <FontAwesomeIcon 
          icon={faHeartbeat} 
          className="absolute text-gold text-8xl bottom-1/4 right-1/4" 
        />
      </div>
      
      <div className="footer-content max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-6 relative inline-block tracking-wider">
            MediCompare
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gold rounded-full transition-all duration-300 group-hover:w-16"></span>
          </h3>
          <p className="text-accent leading-relaxed mb-6">
            Empowering patients with accurate medicine comparisons to make informed healthcare decisions.
          </p>
          <div className="social-links flex gap-4 mt-8">
            {socialIcons.map((social, index) => (
              <a 
                key={index}
                href="#" 
                className="text-primary bg-gold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-md hover:shadow-lg"
                aria-label={social.name}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-6 relative inline-block tracking-wider">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gold rounded-full transition-all duration-300 group-hover:w-16"></span>
          </h3>
          <ul className="footer-links space-y-4">
            {quickLinks.map((link, index) => (
              <li key={index} className="relative pl-6">
                <span className="absolute left-0 top-0 text-gold">•</span>
                <a href="#" className="text-accent hover:text-white hover:translate-x-1 transition-all duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-6 relative inline-block tracking-wider">
            Health Resources
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gold rounded-full transition-all duration-300 group-hover:w-16"></span>
          </h3>
          <ul className="footer-links space-y-4">
            {healthResources.map((resource, index) => (
              <li key={index} className="relative pl-6">
                <span className="absolute left-0 top-0 text-gold">•</span>
                <a href="#" className="text-accent hover:text-white hover:translate-x-1 transition-all duration-300">
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-6 relative inline-block tracking-wider">
            Contact
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gold rounded-full transition-all duration-300 group-hover:w-16"></span>
          </h3>
          <ul className="footer-links space-y-4">
            {contactInfo.map((info, index) => (
              <li key={index} className="relative">
                <a href="#" className="text-accent hover:text-white transition-all duration-300 flex items-start">
                  <FontAwesomeIcon icon={info.icon} className="text-gold mr-3 mt-1" />
                  <span>{info.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="copyright mt-16 pt-8 border-t border-white/10 text-center text-accent text-sm relative max-w-7xl mx-auto px-8">
        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gold"></span>
        <p>&copy; 2023 MediCompare Premium Medicine Comparison. All rights reserved.</p>
        <p className="mt-2 text-xs">This site does not provide medical advice. Consult your healthcare professional.</p>
      </div>
    </footer>
  );
};

export default Footer;