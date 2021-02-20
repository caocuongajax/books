import React from "react";
import { connectToDatabase } from '../util/mongodb'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap'
import AdSense from 'react-adsense'
// var cheerio = require('cheerio');
// var rp = require('request-promise');

export default function Home({ movies, page }) {
  let items = [];
  const totalPage = 435;
  let start = +page - 3;
  start = start < 1 ? 1 : start;
  let end = +page + 3;
  end = end > totalPage ? totalPage : end;
  for (let number = start; number <= end; number++) {
    items.push(
      <Pagination.Item href={`/?page=${number}`} key={number} active={number === +page}>
        {number}
      </Pagination.Item>,
    );
  }
  return <>
    <Container>
      <Row className="my-5 align-items-center">
        <Col lg="7">
          <div className="px-5 text-center">
            <img className="img-fluid rounded mb-4 mb-lg-0 movie-poster" src={movies[0].poster} />
          </div>
        </Col>
        <Col lg="5">
          {/* <h1 className="font-weight-light">{`${movies[0].title} (${movies[0].year})`}</h1> */}
          <h1 className="font-weight-light">{`${movies[0].title}`}</h1>
          {movies[0].sub_title ? <p className="text-muted text-truncate">{movies[0].sub_title}</p> : null}
          <p className="text-truncate text-danger">{movies[0].category ? movies[0].category : ''}</p>
          {/* <p><span className="text-danger font-weight-bold">{movies[0].imdb.rating}</span><span className="small"> / {movies[0].imdb.votes}</span></p> */}
          <p className="text-justify text-truncate-3">{movies[0].plot}</p>
          <a className="btn btn-primary" href={`/books/${movies[0]._id}`}>More Info</a>
        </Col>
      </Row>
    </Container>
    <div className="svg-border-rounded text-light-2 pt-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>
    </div>
    <section className="bg-light-2">
      <Container className="pt-5">
        <Card className="text-white bg-secondary mb-5 py-4 text-center">
          <Card.Body>
            <AdSense.Google
              client='ca-pub-8323116050970599'
              slot='3168302204'
              responsive="true"
              style={{ display: 'block' }}
              layout='in-article'
              format='fluid'
            />
            {/* <p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p> */}
          </Card.Body>
        </Card>
        <Row className="mt-5">
          {movies.map((item, index) => index > 0 ?
            <Col md="3" className="mb-5" key={index}>
              <Card className="h-100 min-height-340" style={{ backgroundImage: `url(${item.poster})` }}>
                {/* <Card.Img src={item.poster} variant="top" /> */}
                <Card.Body>
                  <div className="data">
                    {/* <Card.Title className="text-truncate">{`${item.title} (${item.year})`}</Card.Title> */}
                    <Card.Title className="text-truncate">{`${item.title}`}</Card.Title>
                    {item.category ? <Card.Text className="text-muted text-truncate">{item.category}</Card.Text> : null}
                    {/* <Card.Text className="text-muted text-truncate">{item.genres ? item.genres.join(', ') : ''}</Card.Text> */}
                    <Card.Text className="text-truncate-3">{item.plot}</Card.Text>
                    <Card.Link href={`/books/${item._id}`}>More Info</Card.Link>
                  </div>
                </Card.Body>
                {/* <Card.Footer>
                <a href="#" className="btn btn-primary btn-sm">More Info</a>
              </Card.Footer> */}
              </Card>
            </Col>
            : null
          )}
        </Row>
        <Row>
          <Col>
            <Pagination className="justify-content-center">
              <Pagination.Prev href={`/?page=${+page - 1}`} disabled={+page === 1} />
              {items}
              <Pagination.Next href={`/?page=${+page + 1}`} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </section>
  </>
}
export async function getServerSideProps(context) {
  console.log(context.query);
  let page = context.query.page ? context.query.page : 1
  const { db } = await connectToDatabase()

  const movies = await db
    .collection("books")
    .aggregate([
      {
        $match: {
          $and: [
            { poster: { $ne: null } },
            { plot: { $ne: null } }
          ]
        }
      },
      { $sample: { size: 9 } }
    ])
    // .find({})
    // .sort({ metacritic: -1 })
    // .limit(20)
    .toArray();

  // const base_uri = 'https://oiipdf.com'
  // const url = `${base_uri}/search?language=1&page=${page}`
  // const links = await getLinks(url)
  // const books = []
  // for (let i = 0; i < links.length; i++) {
  //   const link = links[i]
  //   const url2 = `${base_uri}${link}`
  //   const book = await getBook(url2)
  //   book['url'] = url2
  //   books.push(book)
  //   db.collection('books').insert(JSON.parse(JSON.stringify(book)))
  // }

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
      // books: books,
      page: page
    },
  }
}
function getHtml(url) {
  const options = {
    uri: url,
    transform: body => {
      return cheerio.load(body);
    }
  };
  return rp(options)
}
async function getBook(url) {
  const pageHTML = await getHtml(url)
  const html = pageHTML.html()
  const $ = cheerio.load(html)
  const book = {}
  book['poster'] = $('img.rounded')[0].attribs.src
  book['plot'] = $('p.description').text().trim()
  $('tr').toArray().map((item, index) => {
    const field = $(item).find('th').text().trim().toLowerCase().replace(' ', '_')
    let giatri = $(item).find('td').text().trim()
    if (giatri !== '') {
      if (field === 'author' || field === 'tags') {
        const tmp = giatri.split(/\n/)
        giatri = tmp.filter(el => el.trim() !== '')
        giatri = giatri.map(s => s.trim())
      }
      book[field] = giatri
    }
  })
  return book
}
async function getLinks(url) {
  const pageHTML = await getHtml(url)
  const html = pageHTML.html()
  const $ = cheerio.load(html)
  const tags = $('li.media')
  const links = []
  $(tags).each((_index, link) => {
    links.push($(link).find('h5')[0].children[0].attribs.href);
  });
  return links
}