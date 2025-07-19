import { SoftwareSourceCode, WithContext } from "schema-dts";

const JSONLD = ({ data, packageName }: any) => {
  const { npm, gitHub } = data || {};
  const npmData = npm?.data || {};
  const githubData = gitHub?.data || {};

  const jsonData: WithContext<SoftwareSourceCode> = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: npmData?.name,
    description: npmData?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/package/${packageName}`,
    codeRepository: githubData?.repositoryUrl,
    programmingLanguage: githubData?.primaryLanguage,
    license: githubData?.license,
    version: npmData?.version,
    datePublished: githubData?.updatedAt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
    />
  );
};

export default JSONLD;
