import Cosmic from 'cosmicjs'
import truncate from 'html-truncate'
import dateFormat from 'dateformat'

var config = {}

config.bucket = {
  slug: 'wealth-woman',
  read_key: '', // add read_key if added to your Cosmic JS bucket settings
  write_key: '' // add write_key if added to your Cosmic JS bucket settings
}

function fetchData(partials, path, types, res, offset) {
  let objectType = types[offset]

  if (typeof objectType === "undefined") {
    let page = (path === '') ? 'index.html' : path + '.html'

    Cosmic.getObjectType(config, {type_slug: 'blogs', limit: 3}, function(err, data) {
        res.locals.homeBlogs = data.objects.all;

        res.locals.homeBlogs.forEach(function(item) {
            item.metadata.date = parseDate(item.metadata.date);
        });

        return res.render(page, {
          partials
        })
    });
  } else {
    if (objectType.list[0])
      fetchObjectType(partials, path, types, res, offset)
    else
      fetchObject(partials, path, types, res, offset)
  }
}

function fetchObjectType(partials, path, types, res, offset) {
  let objectType = types[offset]

  let limit = 0
  if(path == 'blog')
    limit = 6
  else if(path == '')
    limit = 0

  var params = {
    type_slug: objectType.type,
    limit: limit,
    skip: 0
  };
  Cosmic.getObjectType(config, params, (err, response) => {
    if (err) console.error('There was an error', err)

    if(response.objects.all) {
      res.locals[objectType.type] = response.objects.all
      if(objectType.type=='globals'){
        res.locals[objectType.type].forEach((item, i) => {
            res.locals[item.slug] = item;
        });
      }

      if(objectType.type == 'blogs') {
        res.locals['load-more-blog'] = !(response.total > response.objects.all.length) ? 'style="display:none;"' : ''
        res.locals.page = {title: 'Blogs'}
        res.locals.blogs.forEach((item, i) => {
          res.locals.blogs[i].content = truncate(item.content, 150);
          res.locals.blogs[i].created = {day: dateFormat(item.created, "dd"), month: dateFormat(item.created, "mmm")};
          res.locals.blogs[i]['formatedDate'] = parseDate(item.metadata.date);

          if(typeof res.locals.blogs[i].metadata.categories!="undefined"){
            var categoryFilter = '';
            res.locals.blogs[i].metadata.categories.forEach((item, i) => {
              if(i == 0)
                categoryFilter = item.slug
              else
                categoryFilter += ', ' + item.slug
            })
            res.locals.blogs[i].category_filter = categoryFilter
          }
        })
      } else if(objectType.type == 'whitepapers') {
          res.locals['load-more-whitepapers'] = !(response.total > response.objects.all.length) ? 'style="display:none;"' : ''
          res.locals.page = {title: 'White Papers'}

      }else if(objectType.type == 'marytvs') {
        res.locals.page = {title: 'Mary-Tv'}
        res.locals.marytvs.forEach((item, i) => {
        res.locals.marytvs[i].content = truncate(item.content, 250);
        //let upload_video=res.locals.marytvs[i].metadata.video.url;
        //let video_url='';
        //video_url=(typeof upload_video !="undefined" && upload_video!="https://cosmicjs.com/uploads/")?upload_video:res.locals.marytvs[0].metadata.video_link
        //res.locals.marytvs[i].video=video_url;

          if(typeof res.locals.marytvs[i].metadata.categories!="undefined"){
              var categoryFilter = '';
              res.locals.marytvs[i].metadata.categories.forEach((item, i) => {
                  if(i == 0)
              categoryFilter = item.slug
          else
              categoryFilter += ', ' + item.slug
          })
              res.locals.marytvs[i].category_filter = categoryFilter
          }
        })
      }else if(objectType.type == 'calendars'){

        res.locals['load-more-calendar'] = !(response.total > response.objects.all.length) ? 'style="display:none;"' : ''
        res.locals.page = {title: 'Calendar'}
        res.locals.calendars.forEach((item, i) => {
          res.locals.calendars[i].content = truncate(item.content, 150);
          res.locals.calendars[i].created = {day: dateFormat(item.created, "dd"), month: dateFormat(item.created, "mmm")};
          res.locals.calendars[i]['formatedDate'] = parseDate(item.metadata.date);

        })
      }else if(objectType.type == 'faqs'){

        res.locals['load-more'] = !(response.total > response.objects.all.length) ? 'style="display:none;"' : ''
        res.locals.page = {title: 'FAQS'}
        res.locals.faqs.forEach((item, i) => {
          res.locals.faqs[i].created = {day: dateFormat(item.created, "dd"), month: dateFormat(item.created, "mmm")};
          if(typeof res.locals.faqs[i].metadata.categories!="undefined"){
            var categoryFilter = '';
            res.locals.faqs[i].metadata.categories.forEach((item, i) => {

              if(i == 0)
                  categoryFilter = item.slug
              else
                  categoryFilter += ' ' + item.slug
            })
            res.locals.faqs[i].category_filter = categoryFilter
          }

        })
      }
    }
    //console.log(res.locals);
    fetchData(partials, path, types, res, ++offset)
  })
}

function fetchObject(partials, path, types, res, offset) {
  let objectType = types[offset]

  let params = {
    slug: objectType.list[1],
  };

  Cosmic.getObject(config, params, (err, response) => {
    if (err) console.error('There was an error', err)

  if (response.object) {
    if(objectType.type == 'page') {
      res.locals.page = response.object
    }else {
      res.locals[objectType.list[1]] = response.object
      let pages=['home','speaking','mary-tv']
      if (pages.indexOf(objectType.list[1])!=-1 ) {
        let metaDataObjects = res.locals[objectType.list[1]].metadata;
        let metabox=['blog_box_1','blog_box_2','blog_box_3','event']
        for (let obj in metaDataObjects) {
          if (metabox.indexOf(obj)!=-1) {
              metaDataObjects[obj]['formatedDate'] = parseDate(metaDataObjects[obj].metadata.date);
          }
        }
      }
      if (objectType.list[1] == 'ww-difference') {
         // console.log(res.locals[objectType.list[1]],'data')
        let metaFieldsObjects = res.locals[objectType.list[1]].metafields;
        for (let obj in metaFieldsObjects) {
          if (metaFieldsObjects[obj].key == 'image') {
              metaFieldsObjects[obj-1]['linked_image'] = metaFieldsObjects[obj];
              delete metaFieldsObjects[obj];
          }
        }
        let arr=res.locals[objectType.list[1]].metafields;
        res.locals[objectType.list[1]].metafields = arr.filter(function(n){ return n != ''});

        metaFieldsObjects = res.locals[objectType.list[1]].metafields;
        let count=1;
        let temp_array=[];
        let metabox=['banner','download_box_1','download_box_2','download_box_3','download_box_4', 'video_id'];
        for (let obj2 in metaFieldsObjects) {
          if(metabox.indexOf(metaFieldsObjects[obj2].key) == -1) {
                metaFieldsObjects[obj2]['count'] = romanize(count++);
                temp_array.push(metaFieldsObjects[obj2]);
                res.locals[objectType.list[1]]['mapped_data']=temp_array;
          }
        }
      }
      if(objectType.list[1] == 'speaking'){
        let metaFieldsObjects = res.locals[objectType.list[1]].metafields;
        let count=1;
        let temp_array=[];
        let metabox=['banner','event','footer_box_content_2'];
        for (let obj2 in metaFieldsObjects) {
          if(metabox.indexOf(metaFieldsObjects[obj2].key) == -1) {
            metaFieldsObjects[obj2]['count'] = romanize(count++);
            temp_array.push(metaFieldsObjects[obj2]);
            res.locals[objectType.list[1]]['mapped_data']=temp_array;
          }
        }
      }
    }
  }

  fetchData(partials, path, types, res, ++offset)
})
}
function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
        roman = '',
        i;
    for ( i in lookup ) {
        while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}
export function parseDate(date){
   return {
        fullDay: dateFormat(date, "dddd"),
        dayNum: dateFormat(date, "d"),
        monthNum: dateFormat(date, "mm"),
        fullMonth: dateFormat(date, "mmmm"),
        halfMonth: dateFormat(date, "mmm"),
        year: dateFormat(date, "yyyy")
    };
}
export function getData(partials, path, types, res) {
  fetchData(partials, path, types, res, 0)
}
