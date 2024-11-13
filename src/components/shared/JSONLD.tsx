const JSONLD = ({ data, packageName }: any) => {
  const { npm, gitHub } = data || {};
  const npmData = npm?.data || {};
  const githubData = gitHub?.data || {};

  const jsonData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: npmData?.name,
    description: npmData?.description,
    url: `https://npmpackage.info/package/${packageName}`,
    codeRepository: githubData?.repositoryUrl,
    programmingLanguage: githubData?.primaryLanguage,
    license: githubData?.license,
    version: npmData?.version,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
    />
  );
};

export default JSONLD;
