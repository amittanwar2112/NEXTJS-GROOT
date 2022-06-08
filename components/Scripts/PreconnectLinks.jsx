import { domains } from './config';

export const PreconnectLinks = () => {
  return (
    <>
      {domains?.map((obj) => (
        <>
          <link rel="preconnect" href={obj.domainURL} />
          <link rel="dns-prefetch" href={obj.domainURL} />
        </>
      ))}
    </>
  );
};
