import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `RJM Developer Blog`,
    siteUrl: `https://www.reesemorris.com`,
    description: 'Software developer based in the UK'  
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/content"
    },
    __key: "pages"
  }, {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 800,
          },
        },
        `gatsby-remark-prismjs`
      ],
    },
  },
  {
    resolve: `gatsby-remark-prismjs`,
    options: {
      classPrefix: "language-",
      // This is used to allow setting a language for inline code
      // (i.e. single backticks) by creating a separator.
      // This separator is a string and will do no white-space
      // stripping.
      // A suggested value for English speakers is the non-ascii
      // character '›'.
      inlineCodeMarker: null,
      // This lets you set up language aliases.  For example,
      // setting this to '{ sh: "bash" }' will let you use
      // the language "sh" which will highlight using the
      // bash highlighter.
      aliases: {},
      // This toggles the display of line numbers globally alongside the code.
      // To use it, add the following line in gatsby-browser.js
      // right after importing the prism color scheme:
      //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
      // Defaults to false.
      // If you wish to only show line numbers on certain code blocks,
      // leave false and use the {numberLines: true} syntax below
      showLineNumbers: false,
      // If setting this to true, the parser won't handle and highlight inline
      // code used in markdown i.e. single backtick code like `this`.
      noInlineHighlight: false,
      // This adds a new language definition to Prism or extend an already
      // existing language definition. More details on this option can be
      // found under the header "Add new language definition or extend an
      // existing language" below.
      languageExtensions: [
        {
          language: "superscript",
          extend: "javascript",
          definition: {
            superscript_types: /(SuperType)/,
          },
          insertBefore: {
            function: {
              superscript_keywords: /(superif|superelse)/,
            },
          },
        },
      ],
      // Customize the prompt used in shell output
      // Values below are default
      prompt: {
        user: "root",
        host: "localhost",
        global: false,
      },
      // By default the HTML entities <>&'" are escaped.
      // Add additional HTML escapes by providing a mapping
      // of HTML entities and their escape value IE: { '}': '&#123;' }
      escapeEntities: {},
    },
  }]
};

export default config;
