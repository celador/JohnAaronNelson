import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import twitter from "./../../content/assets/twitter.svg"
import github from "./../../content/assets/github.svg"
import batch from "./../../content/assets/batch.png"

import { rhythm } from "../utils/typography"

const linkStyle = {
  marginRight: rhythm(1 / 4),
  boxShadow: `none`,
}

const iconStyle = {
  marginBottom: 0,
  borderRadius: `50%`,
  maxWidth: 20,
}

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 75,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              Written by <strong>{author}</strong>, who lives and works in
              Chattanooga, building things for Batch.sh.
              <br />
              <a
                style={linkStyle}
                href={`https://twitter.com/${social.twitter}`}
              >
                <img src={twitter} style={iconStyle} />
              </a>{" "}
              <a style={linkStyle} href={`https://github.com/${social.github}`}>
                <img src={github} style={iconStyle} />
              </a>{" "}
              <a style={linkStyle} href="https://batch.sh/about">
                <img src={batch} style={iconStyle} />
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 75, height: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Bio
