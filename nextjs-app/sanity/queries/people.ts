import { defineQuery } from "next-sanity";
import { basePersonFields, imageAssetFields } from "./fragments";

export const personQuery = defineQuery(`
  *[_type == "person" && slug.current == $slug][0]{
    ${basePersonFields},
    video {
      asset->{_id,url,assetId,originalFilename,extension,size},
      thumbnailImage { ${imageAssetFields} }
    },
    _createdAt,_updatedAt,_type,_rev
  }
`);

export const allPersonsQuery = defineQuery(`
  *[_type == "person"] | order(name asc) { ${basePersonFields} }
`);
