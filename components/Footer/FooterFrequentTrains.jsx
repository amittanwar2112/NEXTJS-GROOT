

export default (props) => {
  const { footerItem = {} } = props;
  const { block_title = "", links_data = [] } = footerItem;
  return (
    <p className="fl width100">
      <span className="greyLter ico12 fb fl padR5 padB5">{block_title} :</span>
      {links_data.map((linkItem) => {
        return <a href={linkItem.link}>{linkItem.meta_title} |</a>;
      })}
    </p>
  );
};
