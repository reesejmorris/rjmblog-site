import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./index.css"

const IndexPage: React.FC<PageProps> = () => {
  const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    blog: allMarkdownRemark {
      posts: nodes {
        frontmatter {
          date(fromNow: true)
          title
          slug
        }
        excerpt
        id
      }
    }
  }
  `)

const { posts } = data.blog

  return (
    <main>
      <h1>
        {data.site.siteMetadata.title} 
        <br />
        <span>.NET BLOG</span>
      </h1>

      {posts.map(post => (
        <article key={post.id}>
          <Link to={post.frontmatter.slug}><h2>{post.frontmatter.title}</h2></Link>
          <small>{post.frontmatter.date}</small>
          <p>{post.excerpt}</p>
        </article>
      ))}


      <Link to="/xunit-autofixture">Level up your XUnit tests with Autofixture</Link> <br/>
      <Link to="/tiny-apis">Minimal APIs + Mediatr in .NET 7</Link>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>RJM Dev Blog</title>
