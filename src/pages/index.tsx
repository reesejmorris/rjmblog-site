import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import "./index.css"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>
        RJM 
        <br />
        <span>.NET BLOG</span>
      </h1>
      <p>
        Welcome to my blog, check out the latest posts below. 
      </p>
      <Link to="/xunit-autofixture">Level up your XUnit tests with Autofixture</Link>
      <Link to="/tiny-apis">Minimal APIs + Mediatr in .NET 7</Link>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>RJM Dev Blog</title>
