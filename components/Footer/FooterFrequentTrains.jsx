import styles from '../../styles/Footer.module.css'
export default (props) => {
  const { footerItem = {}} = props;
  const { block_title = '', links_data = [] } = footerItem;
  return (
    <div className={`${styles.pageFtrCnt__topTrnsCnt}`} >
      <p className={`${styles.font14} ${styles.lineHight18} ${styles.blackText2} ${styles.appendBottom15}`}>
          {block_title}
      </p>
      <ul className={`${styles.pageFtrCnt__topTrnsLstCnt} ${styles.footerLinks}`}>
        {links_data.map((linkItem) => {
          return (<li className={`${styles.font14} ${styles.lineHight18} ${styles.appendTop4}`}><a href={linkItem.link}>{linkItem.meta_title} </a><span style={{paddingRight:'3px'}}>|</span></li>);
        })}
      </ul>
    </div>
  );
}
