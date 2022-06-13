const Faq = (props) => {
  const {faqTemplateData} = props;
  return (
    <div dangerouslySetInnerHTML={{ __html: faqTemplateData }}/>
  );
}

export default Faq;
