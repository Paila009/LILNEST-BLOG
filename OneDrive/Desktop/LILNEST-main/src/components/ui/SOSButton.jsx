import React, { useRef, useState } from 'react';

const SOSButton = () => {
  const [active, setActive] = useState(false);
  const t = useRef(null);

  const start = () => {
    setActive(true);
    t.current = setTimeout(async () => {
      try {
        const pos = await new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve, () => resolve(null)));
        const loc = pos?.coords ? `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}` : '';
        const msg = encodeURIComponent(`Emergency SOS from LILNEST. ${loc}`);
        window.open(`sms:?&body=${msg}`, '_self');
      } finally {
        setActive(false);
      }
    }, 3000);
  };

  const cancel = () => {
    clearTimeout(t.current);
    setActive(false);
  };

  return (
    <button onMouseDown={start} onMouseUp={cancel} onMouseLeave={cancel} onTouchStart={start} onTouchEnd={cancel} className={`fixed bottom-5 left-5 rounded-full w-14 h-14 shadow-soft ${active ? 'bg-error text-error-foreground' : 'bg-accent text-accent-foreground'}`} title="Long press (3s) to send SOS">
      ☎
    </button>
  );
};

export default SOSButton;
