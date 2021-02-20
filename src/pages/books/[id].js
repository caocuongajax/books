import React from "react";
import { connectToDatabase } from '../../util/mongodb'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap'
import AdSense from 'react-adsense'
import { ObjectID } from 'mongodb'
// var cheerio = require('cheerio');
// var rp = require('request-promise');

export default function Home({ movies }) {
    // let items = [];
    // const totalPage = 435;
    // let start = +page - 3;
    // start = start < 1 ? 1 : start;
    // let end = +page + 3;
    // end = end > totalPage ? totalPage : end;
    // for (let number = start; number <= end; number++) {
    //     items.push(
    //         <Pagination.Item href={`/?page=${number}`} key={number} active={number === +page}>
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }
    // console.log(movies)
    return <>
        <Container>
            <Row className="mb-5">
                <Col>
                <AdSense.Google
                    client='ca-pub-8323116050970599'
                    slot='3168302204'
                    responsive="true"
                    style={{ display: 'block' }}
                    layout='in-article'
                    format='fluid'
                />
                </Col>
            </Row>
            <Row className="my-5 align-items-center">
                <Col lg="5">
                    {/* <h1 className="font-weight-light">{`${movies.title} (${movies.year})`}</h1> */}
                    <h1 className="font-weight-light">{`${movies.title}`}</h1>
                    {movies.sub_title ? <p className="text-muted text-truncate">{movies.sub_title}</p> : null}
                    <p className="text-truncate text-danger">{movies.category ? movies.category : ''}</p>
                    {/* <p><span className="text-danger font-weight-bold">{movies.imdb.rating}</span><span className="small"> / {movies.imdb.votes}</span></p> */}
                    <p className="text-justify text-truncate-3">{movies.plot}</p>
                    <a className="btn btn-primary mb-4" href={`/books/${movies._id}`}>Download</a>

                </Col>
                <Col lg="7">
                    <div className="text-center book-cover">
                        <div className="libro">
                            {/* <span></span> */}
                            <img className="img-fluid rounded mb-4 mb-lg-0" src={movies.poster} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        <div className="svg-border-rounded text-light-2 pt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>
        </div>
        <section className="bg-light-2">
            <Container className="pt-5">
                {/* <Card className="text-white bg-secondary mb-5 py-4 text-center">
                    <Card.Body>
                        {/* <p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p> /}
                    </Card.Body>
                </Card> */}
                <Row className="mt-5">
                    {/* {movies.map((item, index) => index > 0 ?
                        <Col md="3" className="mb-5" key={index}>
                            <Card className="h-100 min-height-340" style={{ backgroundImage: `url(${item.poster})` }}>
                                {/* <Card.Img src={item.poster} variant="top" /> /}
                                <Card.Body>
                                    <div className="data">
                                        {/* <Card.Title className="text-truncate">{`${item.title} (${item.year})`}</Card.Title> /}
                                        <Card.Title className="text-truncate">{`${item.title}`}</Card.Title>
                                        {item.category ? <Card.Text className="text-muted text-truncate">{item.category}</Card.Text> : null}
                                        {/* <Card.Text className="text-muted text-truncate">{item.genres ? item.genres.join(', ') : ''}</Card.Text> /}
                                        <Card.Text className="text-truncate-3">{item.plot}</Card.Text>
                                        <Card.Link href={`/books/${item._id}`}>More Info</Card.Link>
                                    </div>
                                </Card.Body>
                                {/* <Card.Footer>
                <a href="#" className="btn btn-primary btn-sm">More Info</a>
              </Card.Footer> /}
                            </Card>
                        </Col>
                        : null
                    )} */}
                </Row>
            </Container>
        </section>
    </>
}
export async function getServerSideProps(context) {
    //   console.log(context.query);
    //   let page = context.query.page ? context.query.page : 1
    const { id } = context.query
    const { db } = await connectToDatabase()

    const movies = await db
        .collection("books")
        // .aggregate([
        //     {
        //         $match: {
        //             $and: [
        //                 { poster: { $ne: null } },
        //                 { plot: { $ne: null } }
        //             ]
        //         }
        //     },
        //     { $sample: { size: 9 } }
        // ])
        .findOne({ _id: ObjectID(id) })
    // .sort({ metacritic: -1 })
    // .limit(20)
    // .toArray();
    // console.log(id, movies)

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
            // page: page
        },
    }
}