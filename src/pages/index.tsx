import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import "./index.css"

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 64
}

const headingAccentStyles = {
  color: "#ffffea",
}

const paragraphStyles = {
  marginBottom: 48,
}

const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        RJM 
        <br />
        <span style={headingAccentStyles}>.NET BLOG</span>
      </h1>
      <p style={paragraphStyles}>
        Welcome to my blog, check out the latest posts below. 
      </p>
      <Link to="/tiny-apis">Minimal APIs + Mediatr in .NET 7</Link>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>RJM Dev Blog</title>
