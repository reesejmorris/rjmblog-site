import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link, useStaticQuery, graphql } from "gatsby"
import "./index.css"

type BlogPost = {
  id: string
  excerpt: string
  frontmatter: {
    date: string
    title: string
    slug: string
  }
}

type IndexQueryData = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  blog: {
    posts: BlogPost[]
  }
}

const IndexPage: React.FC<PageProps> = () => {
  const data = useStaticQuery<IndexQueryData>(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    blog: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      posts: nodes {
        frontmatter {
          date
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
    <main className="content-shell">
      <h1 className="site-title">
        {data.site.siteMetadata.title} 
      </h1>

      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <Link className="post-title-link" to={post.frontmatter.slug}>
            <h2 className="post-title">{post.frontmatter.title}</h2>
          </Link>
          <small className="post-meta">{post.frontmatter.date}</small>
          <p className="post-excerpt">{post.excerpt}</p>
        </article>
      ))}
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>RJM Dev Blog</title>
