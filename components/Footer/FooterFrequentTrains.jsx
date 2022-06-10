const FooterFrequentTrains = (props) => {
  const { footerItem = {}} = props;
  const { block_title = '', links_data = [] } = footerItem;
  return (
    <div className="pageFtrCnt__topTrnsCnt">
      <p className="font14 lineHight18 blackText2 appendBottom15">
          {block_title}
      </p>
      <ul className="pageFtrCnt__topTrnsLstCnt footerLinks">
        {links_data.map((linkItem,index) => {
          return (<li key={index} className="font14 lineHight18 appendTop4"><a href={linkItem.link}>{linkItem.meta_title} </a><span style={{paddingRight:'3px'}}>|</span></li>);
        })}
      </ul>
    </div>
  );
}

export default FooterFrequentTrains;
