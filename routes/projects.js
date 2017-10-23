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
    cosmicCalls.getData(partials, 'projects', [
      {type: 'globals', list: [false, 'contact-info']}, 
      {type: 'project-categories', list: [true]}, 
      {type: 'projects', list: [true]}
    ], res)
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
      type_slug: 'projects',
      limit: 0,
      skip: 0
    };

    Cosmic.getObjectType(config, params, (err, response) => {
      let projects = response.objects.all

      projects.forEach( (project, index) => {
        if (project.slug === slug) {
          res.locals.page = {title: project.title}
          project.created = dateFormat(project.created, "mmmm dd, yyyy");
          res.locals.project = project;

          let categoryTypes = '';
          project.metadata.categories.forEach((item, i) => {
            if(i == 0)
              categoryTypes = item.category.title
            else
              categoryTypes += ' | ' + item.category.title
            
          })
          
          res.locals.category_types = categoryTypes

          if (projects[index-1])
            res.locals.previous = '<a href="/projects/'+projects[index-1].slug+'" class="prev-next__prev prev-next__prev--gray"><div class="prev-next__wrapper"><svg width="27" height="15" viewBox="-1 -1 27 15" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#FFFFFF"><path d="M6.183 12L.26 6.078 6.183.156M.361 6.078h24.144"/></g></svg></div><span>'+projects[index-1].title+'</span></a>'
          else
            res.locals.previous = '<a href="javascript:void(0);" class="prev-next__prev prev-next__prev--gray"></a>'

          if(projects[index+1])
            res.locals.next = '<a href="/projects/'+projects[index+1].slug+'" class="prev-next__next prev-next__prev--red"><span>'+projects[index+1].title+'</span><div class="prev-next__wrapper"> <svg width="27" height="14" viewBox="-1 -1 27 14" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#FFFFFF"><path d="M18.817.064l5.922 5.922-5.922 5.922M24.639 5.986H.495"/></g></svg></div></a>'
          else
            res.locals.next = '<a href="javascript:void(0);" class="prev-next__next prev-next__prev--red"></a>'
        }
      })

      if (!res.locals.project) {
        return res.status(404).render('404.html', {
          partials
        })
      }
      cosmicCalls.getData(partials, 'projects-single', [{type: 'globals', list: [false, 'contact-info']}], res)
    })
  })

  return router
}