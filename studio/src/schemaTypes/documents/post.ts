import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'A short description of the post. Important for SEO and accessibility. Will be visible for example when sharing the post on social media.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The category of the post',
      options: {
        list: [
          {title: 'Zdraví', value: 'Zdraví'},
          {title: 'Pohyb', value: 'Pohyb'},
          {title: 'Metabolismus', value: 'Metabolismus'},
          {title: 'Duševní zdraví', value: 'Duševní zdraví'},
          {title: 'Ženy', value: 'Ženy'},
          {title: 'Muži', value: 'Muži'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: 'tags',
    //   title: 'Tags',
    //   type: 'array',
    //   of: [{type: 'string'}],
    //   description: 'A list of tags for SEO purposes',
    //   options: {
    //     list: [
    //       'Zdraví',
    //       'Duševní zdraví',
    //       'Fyzické zdraví',
    //       'Zdravotní péče',
    //       'Zdravotní služby',
    //       'Psychoterapie',
    //       'Psychologie',
    //       'Psychiatrie',
    //       'Životní styl',
    //       'Úzkost',
    //       'Deprese',
    //       'Stres',
    //     ],
    //     layout: 'list',
    //   },
    //   validation: (rule) => rule.required(),
    // }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'number',
      description: 'Estimated read time in minutes',
      validation: (rule) => rule.min(1).max(60),
      initialValue: 5,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      validation: (rule) => rule.required(),
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, media, authorName, date}) {
      const subtitles = [
        authorName && `by ${authorName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
