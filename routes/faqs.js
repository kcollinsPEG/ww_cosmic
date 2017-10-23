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
    cosmicCalls.getData(partials, 'faq', [{type: 'globals', list: [true]}, {type: 'faqs', list: [true]},{type: 'faq-categories', list: [true]}], res)
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
      type_slug: 'faqs',
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
      slug: 'wealth-woman',
      read_key: '', // add read_key if added to your Cosmic JS bucket settings
      write_key: '' // add write_key if added to your Cosmic JS bucket settings
    }

    let params = {
      type_slug: 'faqs',
      limit: 0,
      skip: 0
    };

    Cosmic.getObjectType(config, params, (err, response) => {
      let faqs = response.objects.all

      faqs.forEach( (faq, index) => {
        if (faq.slug === slug) {
          res.locals.page = {title: faq.title}
          res.locals.faq = faq;
        }
      })

      if (!res.locals.faq) {
        return res.status(404).render('404.html', {
          partials
        })
      }

      cosmicCalls.getData(partials, 'faq', [{type: 'globals', list: [true]}], res)
    })
  })

  return router
}