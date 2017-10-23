import Cosmic from 'cosmicjs'
import truncate from 'html-truncate'
import dateFormat from 'dateformat'
import * as cosmicCalls from './cosmic-calls';
import express from 'express'
import bodyParser from 'body-parser'

module.exports = (app, partials) => {
  var router = express.Router()
  router.use(bodyParser.json()) // support json encoded bodies
  router.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  router.get('/', (req, res) => {
    cosmicCalls.getData(partials, 'blog', [{type: 'globals', list: [true]}, {type: 'blogs', list: [true]},{type: 'whitepapers', list: [true]},{type: 'categories', list: [true]},{type: 'banners', list: [false,'blog-banner']}], res)
  })

  router.post('/load-more', (req, res) => {
    let config = {}
    let skip = req.body.skip

    config.bucket = {
      slug: 'wealth-woman',
      read_key: '', // add read_key if added to your Cosmic JS bucket settings
      write_key: '' // add write_key if added to your Cosmic JS bucket settings
    }

    let params = {
      type_slug: 'blogs',
      limit: 6,
      skip: 6
    };

    Cosmic.getObjectType(config, params, (err, response) => {
      if (err) console.error('There was an error', err)

      let result = {}

      if(response.objects.all) {
        for (var blog in response.object) {
          response.object[blog].content = truncate(response.object[blog].content, 150)
          response.object[blog].created = {
            day: dateFormat(response.object[blog].created, "dd"),
            month: dateFormat(response.object[blog].created, "mm")
          }
          response.object[blog]['formatedDate'] = cosmicCalls.parseDate(response.object[blog].metadata.date);

          var categoryFilter = '';
          response.object[blog].metadata.categories.forEach((item, i) => {
            if(i == 0)
              categoryFilter = item.slug
            else
              categoryFilter += ', ' + item.slug
          })
          response.object[blog].category_filter = categoryFilter
        }

        result['load-more'] = !(response.total <= (Number(response.objects.all.length) + Number(skip)))
        result.success = true
        result.object = response.object
      } else {
        result['load-more'] = false
        result.success = false
      }

      res.json(result)
    })
  })

  router.get('/:slug', (req, res) => {
    const slug = req.params.slug
    let config = {}

    config.bucket = {
      slug: 'wealth-woman',
      read_key: '', // add read_key if added to your Cosmic JS bucket settings
      write_key: '' // add write_key if added to your Cosmic JS bucket settings
    }

    let params = {
      type_slug: 'blogs',
      limit: 0,
      skip: 0
    };

    Cosmic.getObjectType(config, params, (err, response) => {
      let blogs = response.objects.all
      blogs.forEach( (blog, index) => {
        if (blog.slug === slug) {
          res.locals.page = {title: blog.title}
          blog['formatedDate'] = cosmicCalls.parseDate(blog.metadata.date)
          res.locals.blog = blog;

          if (blogs[index-1])
            res.locals.previous = '<a href="/blogs/'+blogs[index-1].slug+'" class="button"><span>Previous</span></a>'
          else
            res.locals.previous = '<a href="/blogs/'+blogs[blogs.length -1].slug+'" class="button"><span>Previous</span></a>'

          if(blogs[index+1])
            res.locals.next = '<a href="/blogs/'+blogs[index+1].slug+'" class="button button--red"><span>Next</span></a>'
          else
            res.locals.next = '<a href="/blogs/'+blogs[0].slug+'" class="button button--red"><span>Next</span></a>'

        }
      })

      if (!res.locals.blog) {
        return res.status(404).render('404.html', {
          partials
        })
      }

      cosmicCalls.getData(partials, 'blog-single', [{type: 'globals', list: [true]},{type: 'blogs', list: [true]}], res)
    })
  })

  return router
}