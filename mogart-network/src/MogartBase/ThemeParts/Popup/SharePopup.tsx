import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faPinterestSquare,faTumblrSquare, faLinkedin, faVk, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faChevronLeft, faXmark ,faEnvelope} from '@fortawesome/free-solid-svg-icons';

interface SharePopupProps {
  url: string;
  title: string;
  onClose: () => void;
}

const SharePopup: React.FC<SharePopupProps> = ({ url, title, onClose }) => {
    const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnTwitter = () => {
    window.open(`http://twitter.com/share?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnPinterest = () => {
    window.open(`http://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, '_blank');
    };

    const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
    };

    const shareOnTumblr = () => {
    window.open(`http://www.tumblr.com/share/link?url=${encodeURIComponent(url)}&name=${encodeURIComponent(title)}`, '_blank');
    };

    const shareOnLinkedIn = () => {
    window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
    };

    const shareOnVK = () => {
    window.open(`http://vkontakte.ru/share.php?url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnWhatsapp = () => {
    window.location.href = `whatsapp://send?text=${encodeURIComponent(url)}`;
    };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6">
      <button className="fixed text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Share</h3>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <a className="text-blue-500 hover:text-blue-700" onClick={shareOnFacebook}>
              <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            </a>
            <a className="text-blue-400 hover:text-blue-600" onClick={shareOnTwitter}>
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a className="text-red-500 hover:text-red-700" onClick={shareOnPinterest}>
              <FontAwesomeIcon icon={faPinterestSquare} size="2x" />
            </a>
            <a className="text-gray-700 hover:text-gray-900" onClick={shareViaEmail}>
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
            <a className="text-indigo-500 hover:text-indigo-700" onClick={shareOnTumblr}>
              <FontAwesomeIcon icon={faTumblrSquare} size="2x" />
            </a>
            <a className="text-blue-700 hover:text-blue-900" onClick={shareOnLinkedIn}>
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a className="text-blue-700 hover:text-blue-900" onClick={shareOnVK}>
              <FontAwesomeIcon icon={faVk} size="2x" />
            </a>
            <a className="text-green-500 hover:text-green-700" onClick={shareOnWhatsapp}>
              <FontAwesomeIcon icon={faWhatsappSquare} size="2x" />
            </a>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Copy Link</h3>
          <div className="flex items-center space-x-2 mb-4">
            <input type="text" id="modal-url" value={url} readOnly className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={copyLinkToClipboard}>Copy</button>
          </div>
          <span className="text-green-500 hidden" id="copied">Copied</span>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
