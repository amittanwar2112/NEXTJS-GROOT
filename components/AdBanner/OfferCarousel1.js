import Siema from 'siema';

const carouselParentWrap = "width: 100%; max-width: 1000px; margin: 0 auto;";
const carouselWrap = "width: 100%; max-width: 1000px; overflow: hidden; height: 235px";
const offerBlkWidget = `
  background: #fff;
  padding: 0 !important;
  box-shadow: 0 1px 2px #ccc;
  margin-right: 5px;
  border-radius: 1.2rem;
  display: inline-block;
  width: 275px`;
const carouselImg = `
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 275px;
  display: flex;
  border-radius: 1.2rem 1.2rem 0 0;
  object-fit: cover;`;
const leftArrWrap = `
  bottom: 105px;
  left: -2%;
  `;
const rightArrWrap = `
  bottom: 105px;`;
const arrowBg = `
  background: white;
  padding: 10px;
  border-radius: 50%`;

class OffersCarousel{
  constructor(id, data = [], noOfItems, shouldMakeAPICall=true) {
    this.$parent_elt = document.getElementById(id);
    this.slotData = data;
    this.perPage = 2;
    this.nextArwIconPos = '95%';
    this.getOffersData = this.getOffersData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getOfferURL = this.getOfferURL.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.renderFirstTime = this.renderFirstTime.bind(this);
    this.resizeTime = null;
    shouldMakeAPICall ? this.getOffersData() : this.render();
    this.count = 0;
    // this.getMediaQueryInfo();
  }

  componentDidMount() {
    if (this.slotData.length > 0) {
      this.carousel = new Siema({
        selector: '.siema',
        duration: 200,
        easing: 'ease-out',
        perPage: 1.89,
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: false,
        rtl: false,
        onInit: () => { this.renderFirstTime() },
        onChange: this.onChange
      });
      this.$prevBtn = this.$parent_elt.querySelector('#_carousel_prev_btn');
      this.$nextBtn = this.$parent_elt.querySelector('#_carousel_next_btn')
      this.$prevBtn.addEventListener('click', () => {
        this.handleClick(false);
      });
      this.$nextBtn.addEventListener('click', () => {
        this.handleClick(true);
      });
      window.onresize = this.handleResize;
      this.handleArrowIcon();
    }
  }

  renderFirstTime() {
    if(this.count === 0) {
      this.count = 1;
      clearTimeout(this.resizeTime);
      this.resizeTime = setTimeout(function() {
      const oldPerPage = this.perPage;
      // this.getMediaQueryInfo();
      if (true|| oldPerPage !== this.perPage) {
        this.render();
      }
    }.bind(this), 500);
    }
  }

  getOfferURL(vertical, userid = '') {
    return `https://voyager.goibibo.com/api/v1/pagemaker/get_chunk_offers_data/?chunk=home_carousel&vertical=${vertical}&flavour=v3${(userid ? '&userid=' + userid : '')}&mode=app`;
  }

  getMediaQueryInfo() {
    // if (window.matchMedia('(min-width: 768px)').matches) {
    //   // this.perPage = 3;
    //   this.nextArwIconPos = '96%';
    // } else if (window.matchMedia('(min-width: 576px)').matches){
    //   // this.perPage = 2;
    //   this.nextArwIconPos = '94%';
    // } else {
    //   // this.perPage = 1;
    //   this.nextArwIconPos = '91%';
    // }
  }

  getOffersData() {
    const { userInfo = {} } = window
    const { userid = '' } = userInfo;
    fetch(this.getOfferURL('train', userid))
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if ( data && data.success && data.data.length > 0) {
          this.slotData = data.data;
          this.render();
        } else {
          if(!data.success) {
            console.log('Unable to get Smart Engage info');
          }
          else {
            console.log('No Slot Data available');
          }
        }
      })
      .catch((error) => {
        console.log('Unable to GET Smart Engage Info', error);
      });
  }

  handleArrowIcon() {
    if (this.carousel.currentSlide === 0) {
      this.$prevBtn.style.opacity = 0;
    } else {
      this.$prevBtn.style.opacity = 1;
    }
    if (this.perPage === this.slotData.length || ((this.carousel.currentSlide + 1) === this.slotData.length)) {
      this.$nextBtn.style.opacity = 0;
    } else {
      this.$nextBtn.style.opacity = 1;
    }
  }

  onChange(val) {
    const nextSlot = this.carousel.currentSlide + this.perPage;
    const $img = this.$parent_elt.querySelector('#offer_carousel_img_' + nextSlot);
    if ($img && $img.dataset.src) {
      $img.src = $img.dataset.src;
      $img.removeAttribute('data-src');
    }
    this.handleArrowIcon();
  }

  handleResize(e) {
    clearTimeout(this.resizeTime);
    this.resizeTime = setTimeout(function() {
      const oldPerPage = this.perPage;
      // this.getMediaQueryInfo();
      if (oldPerPage !== this.perPage) {
        this.render();
      }
    }.bind(this), 500);
  }

  handleClick(isNext) {
    if (isNext && this.carousel) {
      this.carousel.next();
    } else if (!isNext && this.carousel) {
      this.carousel.prev();
    }
    return null;
  }

  render() {
    const { slotData = [] } = this;
    if (slotData.length == 0) {
      return null;
    }
    const imgShowCount = this.perPage + 1;
    this.$parent_elt.innerHTML = `
      <div style="${carouselParentWrap} offerCard">
        <div class="fl posRel" style="${this.perPage !== 3 ? 'width: 100%;' : 'maxWidth: 100%;' }">
          <div class="siema fl" style="${carouselWrap}">
            ${
              slotData.map((slotInfo, index) => {
                const { img_url = '', sub_heading = '', url = '', validity_text = '' } = slotInfo;
                const showImg = index < imgShowCount;
                return (
                  `<div class="offerBlkWdgtNew posRel curPoint" onclick="window.open('${url}', '_blank', 'noopener')" style="${offerBlkWidget}">
                    <img id="offer_carousel_img_${index}"src="${showImg ? img_url : ''}" data-src="${!showImg ? img_url : ''}" alt="${'Offers carousel image ' + index}" style="${carouselImg}" />
                    <p class="ico13 greyDr pad10 lh1-2 fmed txtLeft" style="height: 40px">${sub_heading}</p>
                    <div class="padLR10 padR10 fl width100 padB15">
                      <span class="ico12 grey fl">${ validity_text }</span>
                    </div>
                  </div>`
                )
              })
            }
          </div>
          <div id="_carousel_prev_btn" class="curPoint posAbs fl" style="${leftArrWrap}">
            <div class="circleBlc fl" style="${arrowBg}">
              <i class="icon-arrow-left goBlue ico15" style="position: relative; right: 2px;"></i>
            </div>
          </div>
          <div id="_carousel_next_btn" class="curPoint posAbs fl" style="${rightArrWrap}left: ${this.nextArwIconPos}">
            <div class="circleBlc fl" style="${arrowBg}">
              <i class="icon-arrow-right goBlue ico15"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    this.componentDidMount();
  }
}

if (typeof window !== "undefined") {
  // browser code
  window.__createCarousel = function(id, data, noOfItems = 3, shouldMakeAPICall = true) {
    const carousel = new OffersCarousel(id, data, noOfItems, shouldMakeAPICall);
  }
  
  if (window.__carouselSelecterId && window.__carouselSelecterId.length > 0) {
    window.__carouselSelecterId.forEach(({ selectorId, data }) => {
      window.__createCarousel(selectorId, data);
    });
  }
}




