import { useEffect, useState } from 'react';
import { changeStrToDate, initiateSearch } from '../../helpers/utils';
import styles from '../../styles/Home.module.css';

const RecentSearchesDhome = (props) => {
  // Get localStorage's content on mount
  const [recentTrainSearches, setRecentTrainSearches] = useState([]);
  useEffect(() => {
    if (localStorage) {
      setRecentTrainSearches(JSON.parse(localStorage.getItem('recentTrainSearches')) || []);
    }
  }, []);

  function handleClick(searchItem) {
    initiateSearch(searchItem, 'trainNewDHome_recentSearchClicked', 'recent_searches');
  }

  const { handleRecentSelection } = props;
  if (recentTrainSearches.length === 0) {
    return null;
  }
  return (
    <section className="marginTB10">
      <h3 className={`${styles.titleHeader} ${styles.titleHeaderh2}`}>Recent Searches</h3>
      <div>
        <div className={`${styles.smallCardsWrap}`}>
          {recentTrainSearches.map((searchItem, index) => {
            if (index == 4) {
              return null;
            }
            const { source = {}, destination = {}, date = '', train = {} } = searchItem;
            const { xtr: src_xtr = {} } = source;
            const { xtr: des_xtr = {} } = destination;
            const date_str = changeStrToDate(date);
            const start = src_xtr.cn ? src_xtr.cn : source.irctc_code;
            const end = des_xtr.cn ? des_xtr.cn : destination.irctc_code;
            return (
              <aside
                onClick={handleClick.bind(null, searchItem)}
                className={`${styles.recentSearchCard} ${styles.curPoint}`}
                key={index}>
                <div className={`${styles.cardHdr}`}>
                  <div className={`${styles.hdrTag}`}>
                    <span className="padR5">
                      <i className={`${styles.icontrainsnew} goBlue ico16`}></i>
                    </span>
                    <span className={`${styles.hdrTagTxt}`}>{start + ' to ' + end}</span>
                  </div>
                  <span>
                    <span className="pad10">
                      <i className={`${styles.iconarrowright} goBlue ico10`}></i>
                    </span>
                  </span>
                </div>
                <div className="padT15">
                  <p className="ico16 black">
                    {date_str}
                    {Object.keys(train).length ? (
                      <span className="ico14 padT10 grey50"> - Train No {train.number}</span>
                    ) : (
                      ''
                    )}
                  </p>
                  {/* <p class="ico14 padT10 grey50">{Object.keys(train).length ? `Train No ${train.number}` : ''}</p> */}
                </div>
              </aside>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentSearchesDhome;
