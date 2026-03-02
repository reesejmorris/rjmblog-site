import * as React from "react"
import { graphql, Link } from "gatsby"
import "./index.css"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
      <main className="content-shell">
        <h1 className="site-title">{frontmatter.title}</h1>
        <p className="post-meta">{frontmatter.date}</p>
        <p className="post-nav">
          <Link to="/">HOME</Link>
        </p>
        <article className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
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
