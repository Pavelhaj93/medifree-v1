import { defineQuery } from "next-sanity";

export const allLegalDocumentsQuery = defineQuery(`
  *[_type == "legalDocument"] | order(title asc) {
    _id,title,description,category,
    file{
      asset->{_id,url,assetId,originalFilename,extension,size}
    },
    _createdAt,_updatedAt,_rev
  }
`);

export const gdprQuery = defineQuery(`
  *[_type == "legalDocument" && tag == "gdpr-consent"][0]{
    _id,title,description,category,
    file{
      asset->{_id,url,assetId,originalFilename,extension,size}
    },
    _createdAt,_updatedAt,_type,_rev
  }
`);
