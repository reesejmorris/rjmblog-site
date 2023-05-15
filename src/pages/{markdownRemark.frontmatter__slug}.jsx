import * as React from "react"
import { graphql, Link } from "gatsby"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingAccentStyles = {
  color: "#0059b3",
}

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="bodyStyle">
      <div>
        <h1>{frontmatter.title}</h1>
        <h2 style={headingAccentStyles}>{frontmatter.date}</h2>
        <Link to="/">HOME</Link>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <style jsx>{`
@media (min-width: 100px) {
  .bodyStyle {
    margin-bottom: 48;
    font-family: -apple-system, Roboto, sans-serif, serif;
  }
}
@media (min-width: 800px) {
  .bodyStyle {
    margin-bottom: 48;
    max-width: 1200;
    font-family: -apple-system, Roboto, sans-serif, serif;
  }
}
`}</style>
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