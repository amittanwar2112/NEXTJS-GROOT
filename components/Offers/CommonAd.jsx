const CommonAd = (props) => {
  const {pageName, section = '',isMobile= false,mobileOS= undefined} = props;
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin: isMobile && pageName==="dsrp" ? 0 : mobileOS ==="iOS" ? 30: 15}}>
        <div id="AdPlaceholder" >
        <mmtad id="1" lob="RAIL" pagename={pageName} section={section}></mmtad>
        </div>
    </div>
  );
};

export default CommonAd;
