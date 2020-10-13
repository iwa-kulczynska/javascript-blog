'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);


  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector= '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function clearTitlelist(){
  document.querySelector(optTitleListSelector).innerHTML = '';
}

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  /* remove contents of titleList */

  clearTitlelist();

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    // article.addEventListener('click', titleClickHandler);
        
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }

  console.log(html);
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags){
  const params = {
    min: 999999,
    max: 0
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
} 

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};


  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const articleTagsHtml = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
      console.log(tag);
    }
    /* insert HTML of all the links into the tags wrapper */
    console.log(html);
    articleTagsHtml.innerHTML = html;

  /* END LOOP: for every article: */
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /*[NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */
    const calculateClassSizeHtml = 'class=' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams);
    const tagLinkHrefHtml = ' href=#tag-' + tag;
    console.log('calculateClassSize:', calculateClassSizeHtml);
    const tagCountHTML = ' (' + allTags[tag] + ') ';
    allTagsHTML += '<li><a ' + calculateClassSizeHtml + tagLinkHrefHtml + '>' + tag + '</a>' + tagCountHTML + '</li>';
  }
  /*[NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

  console.log(allTags);

}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const allTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(allTags);


  /* START LOOP: for each active tag link */
  for(let allTag of allTags){
    /* remove class active */
    allTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTags = document.querySelectorAll(href);
  console.log(hrefTags);

  /* START LOOP: for each found tag link */
  for(let hrefTag of hrefTags){
    /* add class active */
    hrefTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('[href^="#tag-"]');
  console.log(tags);

  /* START LOOP: for each link */
  for(let tag of tags){
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all authors */
  const authors = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every authors: */
  for(let author of authors){
    /* find tags wrapper */
    const authorWrapper = author.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get athors from data-athors attribute */
    const authorAttribute = author.getAttribute('data-author');
    console.log(authorAttribute);
    /* generate HTML of the link */
    const linkHTML = '<p><a href="#author-' + authorAttribute +'">' + authorAttribute + '</a></p>';
    console.log(linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the tags wrapper */
    console.log(html);
    authorWrapper.innerHTML = html;
  /* END LOOP: for every authors: */
  }
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* make a new constant "authorHref" and read the attribute "href" of the clicked element */
  const authorHref = clickedElement.getAttribute('href');
  console.log(authorHref);
  /* make a new constant "author" and extract tag from the "href" constant */
  const authorTag = authorHref.replace('#author-', '');
  console.log(authorTag );

  /* find all authors links with class active */
  const allAuthors = document.querySelectorAll('[href^="#author-"]');
  console.log(allAuthors);


  /* START LOOP: for each active author link */
  for(let allAuthor of allAuthors){
  /* remove class active */
    allAuthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const hrefAuthors = document.querySelectorAll('href');
  console.log(hrefAuthors);

  // /* START LOOP: for each found author tag link */
  for(let hrefAuthor of hrefAuthors){
    /* add class active */
    hrefAuthor.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  // /* execute function "generateTitleLinks" with authors selector as argument */
  generateTitleLinks('[data-author="' +  optArticleAuthorSelector + '"]');

}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authors = document.querySelectorAll('[href^="#"]');
  console.log(authors);

  /* START LOOP: for each link */
  for(let author of authors){
    /* add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();