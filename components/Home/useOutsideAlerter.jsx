import { useEffect, useRef } from 'react';

function useOutsideAlerter(ref, cb) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
}

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  const { cb = () => {}, styles = '', inlineStyle = '' } = props;
  useOutsideAlerter(wrapperRef, cb);

  return (
    <div ref={wrapperRef} className={styles} style={{ inlineStyle }}>
      {props.children}
    </div>
  );
}

export default OutsideAlerter;
