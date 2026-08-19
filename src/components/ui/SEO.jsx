import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image }) {
  const siteTitle = 'Shreya Singh — Software Engineer | AI + MERN Developer';
  const fullTitle = title ? `${title} | Shreya Singh` : siteTitle;
  const desc =
    description ||
    'Software Engineer and AI + MERN Developer from IIIT Kota. Specializing in full-stack development, machine learning, and building scalable web applications.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
