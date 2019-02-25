import sqlite from "sqlite"
import fs from "fs-extra"
import moment from "moment"
import { partition } from "ramda"

sqlite.open("/Users/john/ghost.db").then(async db => {
  const posts = await db.all("SELECT * FROM posts")
  const [blog, archive] = partition(post => post.status === "published", posts)

  blog.forEach(post => {
    fs.ensureFileSync(`./content/blog/${post.slug}/index.md`)
    const header = `---
title: ${post.title}
date: "${moment(post.published_at).toJSON()}"
---
`
    fs.writeFileSync(
      `./content/blog/${post.slug}/index.md`,
      header + post.markdown
    )
  })

  archive.forEach(post => {
    fs.ensureFileSync(`./content/archive/${post.slug}/index.md`)
    const header = `---
title: ${post.title}
---
`
    fs.writeFileSync(
      `./content/archive/${post.slug}/index.md`,
      header + post.markdown
    )
  })
})
