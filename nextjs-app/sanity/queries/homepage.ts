import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"][0] {
  _id,
  _type,
  title,
  description,
  pageBuilder[] {
    _type,
    _key,
    _type == "heroSectionCarousel" => {
      heading,
      subheading,
      badge,
      images[],
      showBookButton
    },
    _type == "quoteSection" => {
      quote,
      author,
      backgroundColor
    },
    _type == "therapistSection" => {
      title,
      showAllTherapists,
      showAllTherapists == true => {
        "selectedTherapists": *[_type == "person"] | order(_createdAt asc) {
          _id,
          name,
          slug,
          mainImage,
          description,
          topics[]
        }
      },
      showAllTherapists != true => {
        selectedTherapists[]-> {
          _id,
          name,
          slug,
          mainImage,
          description,
          topics[]
        }
      },
      backgroundColor
    },
    _type == "videoSection" => {
      video-> {
        _id,
        title,
        description,
        videoFile {
          asset-> {
            _id,
            url
          }
        }
      },
      autoplay,
      showControls,
      loop
    },
    _type == "servicesCarouselSection" => {
      title,
      subtitle,
      badge,
      showAllServices,
      showAllServices == true => {
        "selectedServices": *[_type == "homepageService"] | order(_createdAt desc) {
          _id,
          title,
          description,
          icon,
          link,
          image,
        }
      },
      showAllServices != true => {
        selectedServices[]-> {
          _id,
          title,
          description,
          icon,
          link,
          image,
        }
      },
      backgroundColor
    },
    _type == "howItWorksSection" => {
      badge,
      title,
      steps[] {
        title,
        description
      },
      backgroundColor
    },
    _type == "calendarSection" => {
      title,
      subtitle,
      badge,
      description,
      backgroundColor,
      showBookButton
    },
    _type == "socialConnectSection" => {
      title,
      subtitle,
      badge,
      description,
      socialLinks[] {
        platform,
        url,
        label
      },
      backgroundColor
    },
    _type == "contactSection" => {
      title,
      subtitle,
      badge,
      description,
      showContactForm,
      gdprDocument-> {
        _id,
        title,
        file {
          asset-> {
            _id,
            url
          }
        }
      },
      backgroundColor
    },
    _type == "callToAction" => {
      heading,
      text,
      buttonText,
      link {
        linkType,
        href,
        reference-> {
          _type,
          slug
        }
      }
    },
    _type == "infoSection" => {
      heading,
      subheading,
      content
    }
  }
}`;
