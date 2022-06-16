import zlib from 'zlib';
//import { isMobileDevice } from '@helpers/serverUtils';
import { USE_REDIS_CACHE_SEO,SEO_META_DATA } from '@services/config';
import { ALL_TRAIN_ROUTES } from '@helpers/constants';
//var marked = require('marked');
import { marked } from 'marked'

const CUSTOM_IDENTIFIER = '<template/>';

var data, expand, pageInterlinks;

const { FORGOT_PASSWORD_ROUTE, RESET_USER_ID, CREATE_USERID, HOME, HOME_NEW, PNR_HOME, TRAIN_STATUS_HOME, HOME_DWEB } = ALL_TRAIN_ROUTES;

async function generateFaqTemplate(req,path,metaData) {
  metaData = metaData ? metaData : {};
  if (metaData) {
    const { irctc_forgot_userid_json = {}, irctc_forgot_password_json = {}, irctc_create_new_user_json = {}, pnr_status_json = {},train_home_page_content={} ,train_running_status_json = {} } = metaData;
    const pathMetaMap = {
      [CREATE_USERID]: {
        template: irctc_create_new_user_json.template,
        interlinks: irctc_create_new_user_json.interlinks,
        expand: true
      },
      [RESET_USER_ID]: {
        template: irctc_forgot_userid_json.template,
        interlinks: irctc_forgot_userid_json.interlinks,
        expand: true
      },
      [FORGOT_PASSWORD_ROUTE]: {
        template: irctc_forgot_password_json.template,
        interlinks: irctc_forgot_password_json.interlinks,
        expand: true
      },
      [HOME]: {
        template: train_home_page_content.template,
        interlinks: train_home_page_content.interlinks,
        expand: false
      },
      [HOME_DWEB]: {
        template: train_home_page_content.template,
        interlinks: train_home_page_content.interlinks,
        expand: true
      },
      [PNR_HOME]: {
        template: pnr_status_json.template,
        interlinks: pnr_status_json.interlinks,
        expand: true
      },
      [TRAIN_STATUS_HOME]: {
        template: train_running_status_json.template,
        interlinks:train_running_status_json.interlinks,
        expand: true
      }
    }
      data= pathMetaMap[path] && pathMetaMap[path].template ? pathMetaMap[path].template :{};
      pageInterlinks =pathMetaMap[path] && pathMetaMap[path].interlinks ? pathMetaMap[path].interlinks :[];
      expand= pathMetaMap[path] && pathMetaMap[path].expand ? pathMetaMap[path].expand: false;
      if(pathMetaMap[path] && data){
        const { faq = {}, content = ''} = data;
        const { faq_heading = '', faq_content = []} = faq;
        if ((content === '' && !faq_content) || (content === '' && faq_content.length === 0)) {
          return ''
        }
        const isChecked = expand ? 'checked' : '';
        const template = 
        `<section class="trainsfaqouterWrap  style="max-width:1200px" itemscope="" itemtype="https://schema.org/FAQPage">
        <div class="width100 ">
          ${
            content ?
            `<div class="contentWrap marginB15">${marked(content)}</div>` :
            ``
          }
          ${generateInterlinksTemplate(pageInterlinks)}
          <div class="faqHeading">${marked(faq_heading)}</div>
          ${
            faq_content.map((faqItem, index) => {
              const { q = '', a = ''} = faqItem;
              const question = marked(q);
              const answer = marked(a);
              return (
                `<div class="tab" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
                  <input type="checkbox" ${isChecked} id=${'chck' + index} />
                  <label class="tab-label" for=${'chck' + index}>
                    <span class="headingWrap" itemprop="name">${question}</span>
                  </label>
                  <div class="tab-content" itemprop="acceptedAnswer" itemscope="" itemtype="https://schema.org/Answer">
                    <div itemprop="text">
                      ${answer}
                    </div>
                  </div>
                </div>`
              );
            }).join('')
          }
        </div>
      </section>`
        return template;
  }
}
return ''
}

function addScriptToTemplate(template, __fromCache__, isMobile) {
	const [first] = template.split(CUSTOM_IDENTIFIER);
	const scriptStr = `
		<script>
			window.__fromCache__ = ${__fromCache__};
			window.__mweb = ${isMobile};
			window.__goibibo_gtm_id__ = ${isMobile ? `"GTM-TR6DGRG"` : `"GTM-KT7GT2"`};
		</script>
	`;
	template = first + scriptStr;
	return template;
}

function storeInRedis(templateWithId, key) {
	if (global.__REDISCONFIG__.REDISINSTANCE) {
		// gZipping
		zlib.gzip(templateWithId, { encoding: null }, function (compressErr, compressedTemplate) {
			if (compressErr) {
				return;
			}
			// Redis Storing
			global.__REDISCONFIG__.REDISINSTANCE.set(key, compressedTemplate, 'EX', 604800, function (err, resp) {
				if (err) {
					console.log('Error updating redis!\n', err);
				} else {
					console.log(`updated redis mem, key: ${key}`);
				}
			});
		});
	}
}

function getFAQMetaDataCall(url){
  return fetch(url)
		.then((res) => res.json())
		.then(res => {
			if (res && res.status && res.data) {
        //process.env.SEO_META_FAQ_DATA= JSON.stringify(res.data);
				return res.data;
			} else {
				console.log('META FAQ Data');
			}
		}).catch(err => {
      console.log("error",err)
      const data = JSON.stringify(SEO_META_DATA);
      //process.env.SEO_META_FAQ_DATA = JSON.stringify(SEO_META_DATA);
      return data;
		});
}

async function sendNewTemplate(req,res, isMobile, shouldUpdateCache = false, key) {
	try {
		//const { pathname: key123 = '' } = req._parsedUrl;
    //const { url: key = '' } = req;
    //const keyUrl = key.split('?')[0]; 
    const metaData= (await getFAQMetaDataCall(`${process.env.PAGE_ROVER}/gt_rail/api/v1/get_seo_page_data`)) || {};
		const templateWithId = await generateFaqTemplate(req,key,metaData);
		const template = addScriptToTemplate(templateWithId, false, isMobile);
		if (shouldUpdateCache) {
			storeInRedis(templateWithId, key);
		}
      return template;
	} catch (err) {console.log(err,"Error");}
}

function generatePopularTemplate(linksData) {
    if (!linksData) {
        return ``;
    }
    const { title = '', links = []} = linksData;
    if (title && links && links.length > 0) {
        return (
            `<div class="width100  padT10 padB20 padL5">
                <p class="ico16 fmed blueLight">${marked(title)}</p>
            </div>
            <div class="padB15 popularWrap">
            ${
                links.map((item) => {
                    return (
                    `<div class="pad0  marginB10">
                        <div class=" padR5 padT2" style="width: 5%">
                            <i class="icon-trains-new ico15 greyLight"></i>
                        </div>
                        <div class=" padL5" style="width: 95%;">
                            <div class="ico16 ">${marked(item.heading)}</div>
                            <div class="ico12  padT5">${marked(item.subheading)}</div>
                        </div>
                    </div>`
                    );
                }).join('')
            }
            </div>`
        );
    }
    return ``;
}
  
function generateInterlinksTemplate(interlinks) {
  if (interlinks && interlinks.length > 0) {
    const { train_routes = null, train_name = null } = interlinks[0];
    return (
        `<section class="popularSearchWrap">
            <section class="width100  padT20">
                <div class="popularContainerWrap marginB20">
                    ${generatePopularTemplate(train_routes)}
                    ${generatePopularTemplate(train_name)}
                </div>
            </section>
        </section>`
    );
  }
  return '';
}

export async function checkFaqTemplate(cb,hcb,cacheConfigReq,key,req,res, isMobile){
  try{
    if (USE_REDIS_CACHE_SEO && !cb && !hcb && global.__REDISCONFIG__.REDISINSTANCE) {
      return new Promise((resolve,reject)=>{
        global.__REDISCONFIG__.REDISINSTANCE.get(new Buffer(key), function (err, compressedTemplate) {
          if (err || !compressedTemplate) {
            console.log('Redis hit miss, key:', key, err);
            resolve(sendNewTemplate(req,res, isMobile, cacheConfigReq, key));
          } 
          else {
          console.log('Redis hit success, key:', key);
          zlib.gunzip(compressedTemplate, { encoding: null }, function (err, template) {
            if (err) {
              resolve (sendNewTemplate(req,res, isMobile, cacheConfigReq, key));
            } else {
              const templateString = template.toString();
              const clientTemplate = addScriptToTemplate(templateString, true, isMobile);
              resolve(clientTemplate);
            }
          });
        }
      })
      });
    }
     else {
      console.log("Sending New Faq Template in Prod when cb/hcb present");
      let shouldUpdateCache = cacheConfigReq && (cb === '1'||hcb==='1');
      return sendNewTemplate(req,res, isMobile, shouldUpdateCache, key);
    }
  }
  catch (err) {console.log(err,"error");}

}
