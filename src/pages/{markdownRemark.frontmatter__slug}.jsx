import * as React from "react"
import { graphql, Link } from "gatsby"
import "./index.css"

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif"
}

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
      <div className={pageStyles}>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <Link to="/">HOME</Link>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`