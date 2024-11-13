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
    dependencies:
      npmData?.dependencies?.dependencies?.data &&
      Object.keys(npmData?.dependencies?.dependencies?.data)?.map((dep) => ({
        "@type": "SoftwareSourceCode",
        name: dep,
        version: npmData?.dependencies?.dependencies?.data[dep],
      })),
    readme: `https://npmpackage.info/package/${packageName}?t=readme`,
    issueTracker: npmData.bugsUrl || "",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
    />
  );
};

export default JSONLD;
