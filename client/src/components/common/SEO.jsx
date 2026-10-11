import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_TAGLINE } from '../../utils/constants';

const SEO = ({ title, description, keywords }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - ${SITE_TAGLINE}`;
  const metaDesc = description || "Join us in our mission to protect and serve cows. Support our Gaushala through donations, volunteering, and adoptions.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
    </Helmet>
  );
};

export default SEO;
