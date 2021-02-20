import { connectToDatabase } from '../util/mongodb'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col, Card, ListGroup, Pagination } from 'react-bootstrap'
import Image from 'next/image'
import AdSense from 'react-adsense';
// var cheerio = require('cheerio');
// var rp = require('request-promise');

export default function Home({ movies, page }) {
  console.log(movies[0]);
  // console.log(page)
  let items = [];
  const totalPage = 435;
  let start = +page - 5;
  start = start < 1 ? 1 : start;
  let end = +page + 5;
  end = end > totalPage ? totalPage : end;
  for (let number = start; number <= end; number++) {
    items.push(
      <Pagination.Item href={`/?page=${number}`} key={number} active={number === +page}>
        {number}
      </Pagination.Item>,
    );
  }
  return <>
    <Navbar fixed="top" bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img src="/images/logo.png" width="56" />
        Books
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/explore">Explore</Nav.Link>
            <Nav.Link href="/courses">Courses</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
          </Nav>
          <Form inline>
            <FormControl size="sm" type="search" placeholder="Search" className="ml-sm-2" />
            {/* <Button size="sm" variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <Row className="my-5 align-items-center">
        <Col lg="7">
          <div className="px-5 text-center" style={{ maxWidth: 400 }}>
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
          <a className="btn btn-primary" href={`/movies/${movies[0]._id}`}>More Info</a>
        </Col>
      </Row>
      <Card className="text-white bg-secondary my-5 py-4 text-center">
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
                  <Card.Link href={`/movies/${item._id}`}>More Info</Card.Link>
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
          <Pagination>
            <Pagination.Prev href={`/?page=${+page - 1}`} disabled={+page === 1} />
            {items}
            <Pagination.Next href={`/?page=${+page + 1}`} />
          </Pagination>
        </Col>
      </Row>
    </Container>
    <footer className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col md="6"><p className="m-0">Copyright &copy; 2020</p></Col>
          <Col md="6">
            <ListGroup horizontal className="float-right">
              <ListGroup.Item>
                <Image src="/images/payments/visa.png" width="47" height="37" />
              </ListGroup.Item>
              <ListGroup.Item>
                <Image src="/images/payments/master.png" width="47" height="37" />
              </ListGroup.Item>
              <ListGroup.Item>
                <Image src="/images/payments/master2.png" width="47" height="37" />
              </ListGroup.Item>
              <ListGroup.Item>
                <Image src="/images/payments/visa2.png" width="47" height="37" />
              </ListGroup.Item>
              <ListGroup.Item>
                <Image src="/images/payments/america.png" width="47" height="37" />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </footer>
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

  const base_uri = 'https://oiipdf.com'
  const url = `${base_uri}/search?language=1&page=${page}`
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