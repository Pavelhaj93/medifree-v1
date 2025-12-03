import { defineQuery } from "next-sanity";

export const videoQuery = defineQuery(`
  *[_type == "video"][0]{
    _id,title,description,
    videoFile{
      asset->{_id,url,assetId,originalFilename,extension,size}
    },
    mobileVideoFile{
      asset->{_id,url,assetId,originalFilename,extension,size}
    },
    _createdAt,_updatedAt,_type,_rev
  }
`);

export const allVideosQuery = defineQuery(`
  *[_type == "video"] | order(title asc){
    _id,title,description,
    videoFile{
      asset->{_id,url,assetId,originalFilename,extension,size}
    },
    mobileVideoFile{
      asset->{_id,url,assetId,originalFilename,extension,size}
    },
    _createdAt,_updatedAt,_type,_rev
  }
`);
