import * as React from "react"
import { graphql, Link } from "gatsby"
import "./index.css"
import ThemeToggle from "../components/ThemeToggle"

export default function BlogPostTemplate({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <main className="content-shell">
      <div className="post-header">
        <p className="post-nav">
          <Link to="/">← Home</Link>
        </p>
        <ThemeToggle />
      </div>
      <h1 className="site-title">{frontmatter.title}</h1>
      <p className="post-meta">{frontmatter.date}</p>
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
