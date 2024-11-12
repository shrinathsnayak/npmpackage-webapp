export const replaceImageUrls = (content: any, owner: any, name: any, branch: any) => {
  console.log(content.replace(
    /!\[(.*?)\]\((src\/.*?)\)/g,
    `![$1](https://raw.githubusercontent.com/${owner}/${name}/${branch}/$2)`
  ))
  return content.replace(
    /!\[(.*?)\]\((src\/.*?)\)/g,
    `![$1](https://raw.githubusercontent.com/${owner}/${name}/${branch}/$2)`
  );
}
