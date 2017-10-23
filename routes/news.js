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
    cosmicCalls.getData(partials, 'news', [{type: 'globals', list: [false, 'contact-info']}, {type: 'news', list: [true]}], res)
  })

  router.post('/load-more', (req, res) => {
    let config = {}
    let skip = req.body.skip

    config.bucket = {
      slug: 'overly-site-amenities',
      read_key: '', // add read_key if added to your Cosmic JS bucket settings
      write_key: '' // add write_key if added to your Cosmic JS bucket settings
    }

    let params = {
      type_slug: 'news',
      limit: 3,
      skip: skip
    };

    Cosmic.getObjectType(config, params, (err, response) => {
      if (err) console.error('There was an error', err)

      let result = {}

      if(response.objects.all) {
        for (var news in response.object) {
          response.object[news].content = truncate(response.object[news].content, 150)
          response.object[news].created = {
            day: dateFormat(response.object[news].created, "dd"),
            month: dateFormat(response.object[news].created, "mm")
          }
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
      slug: 'overly-site-amenities',
      read_key: '', // add read_key if added to your Cosmic JS bucket settings
      write_key: '' // add write_key if added to your Cosmic JS bucket settings
    }

    let params = {
      type_slug: 'news',
      limit: 0,
      skip: 0
    };

    Cosmic.getObjectType(config, params, (err, response) => {
      let news = response.objects.all

      news.forEach( (story, index) => {
        if (story.slug === slug) {
          res.locals.page = {title: story.title}
          story.created = dateFormat(story.created, "mmmm dd, yyyy");
          story.content_short = truncate(story.content, 250)
          res.locals.story = story;

          if (news[index-1])
            res.locals.previous = '<a href="/news/'+news[index-1].slug+'" class="prev-next__prev prev-next__prev--white"><div class="prev-next__wrapper"><svg width="27" height="15" viewBox="-1 -1 27 15" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#434343"><path d="M6.183 12L.26 6.078 6.183.156M.361 6.078h24.144"/></g></svg></div><span>Previous Post</span></a>'
          else
            res.locals.previous = '<a href="javascript:void(0);" class="prev-next__prev prev-next__prev--white"></a>'

          if(news[index+1])
            res.locals.next = '<a href="/news/'+news[index+1].slug+'" class="prev-next__next prev-next__next--light-gray"><span>Next Post</span><div class="prev-next__wrapper"><svg width="27" height="14" viewBox="-1 -1 27 14" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#434343"><path d="M18.817.064l5.922 5.922-5.922 5.922M24.639 5.986H.495"></path></g></svg></div></a>'
          else
            res.locals.next = '<a href="javascript:void(0);" class="prev-next__next prev-next__next--light-gray"></a>'
        }
      })

      if (!res.locals.story) {
        return res.status(404).render('404.html', {
          partials
        })
      }

      cosmicCalls.getData(partials, 'news-single', [{type: 'globals', list: [false, 'contact-info']}], res)
    })
  })

  return router
}